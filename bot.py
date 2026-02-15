"""
Cha-hai Tea Shop — Notification Bot
====================================
Единый Python-файл:
  • Flask-сервер принимает заявки с сайта (POST /api/order, POST /api/contact)
  • Отправляет уведомление владельцу через Telegram Bot API

Переменные окружения (или .env файл):
  BOT_TOKEN  — токен Telegram-бота (получить у @BotFather)
  CHAT_ID    — ID чата владельца (получить у @userinfobot или @getmyid_bot)

Запуск:
  pip install -r requirements.txt
  python bot.py
"""

import os
import json
import logging
from datetime import datetime

from flask import Flask, request, jsonify
from flask_cors import CORS

import requests as http_client
from dotenv import load_dotenv

# ── Загрузка переменных окружения ────────────────────────────────────────────
load_dotenv()

BOT_TOKEN: str = os.getenv("BOT_TOKEN", "")
CHAT_ID: str = os.getenv("CHAT_ID", "")

if not BOT_TOKEN or not CHAT_ID:
    logging.warning(
        "⚠  BOT_TOKEN и/или CHAT_ID не заданы. "
        "Бот не сможет отправлять уведомления, пока вы их не укажете.\n"
        "  Создайте файл .env рядом с bot.py:\n"
        "    BOT_TOKEN=123456:ABC-DEF...\n"
        "    CHAT_ID=123456789\n"
    )

# ── Flask-приложение ─────────────────────────────────────────────────────────
app = Flask(__name__)
CORS(app)  # Разрешаем кросс-доменные запросы с фронтенда

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-8s  %(message)s",
)
log = logging.getLogger("chahai-bot")


# ── Telegram helpers ─────────────────────────────────────────────────────────
TELEGRAM_API = "https://api.telegram.org/bot{token}/sendMessage"


def send_telegram(text: str) -> bool:
    """Отправить сообщение владельцу в Telegram."""
    if not BOT_TOKEN or not CHAT_ID:
        log.error("BOT_TOKEN или CHAT_ID не настроены — сообщение не отправлено")
        return False

    url = TELEGRAM_API.format(token=BOT_TOKEN)
    payload = {
        "chat_id": CHAT_ID,
        "text": text,
        "parse_mode": "HTML",
    }

    try:
        resp = http_client.post(url, json=payload, timeout=10)
        if resp.status_code == 200:
            log.info("✅ Уведомление отправлено в Telegram")
            return True
        else:
            log.error("Telegram API error %s: %s", resp.status_code, resp.text)
            return False
    except Exception as exc:
        log.error("Ошибка при отправке в Telegram: %s", exc)
        return False


# ── Форматирование сообщений ─────────────────────────────────────────────────
def format_order_message(data: dict) -> str:
    """Формируем красивое сообщение о новом заказе."""
    name = data.get("name", "Не указано")
    contact_type = data.get("contactType", "")  # telegram | whatsapp
    contact = data.get("contact", "")
    items = data.get("items", [])
    total = data.get("total", 0)
    now = datetime.now().strftime("%d.%m.%Y %H:%M")

    # Контакт
    if contact_type == "telegram":
        contact_line = f"Telegram: @{contact.lstrip('@')}"
    elif contact_type == "whatsapp":
        contact_line = f"WhatsApp: {contact}"
    else:
        contact_line = f"{contact_type}: {contact}"

    # Позиции заказа
    items_lines = []
    for item in items:
        line = f"  • {item.get('name', '?')} — {item.get('weight', '?')} × {item.get('qty', 1)}"
        price = item.get("price")
        if price:
            line += f"  ({price}₽)"
        items_lines.append(line)

    items_block = "\n".join(items_lines) if items_lines else "  (без позиций)"

    return (
        f"🛒 <b>Новый заказ!</b>\n"
        f"━━━━━━━━━━━━━━━━━━━\n"
        f"👤 Имя: {name}\n"
        f"📱 {contact_line}\n"
        f"━━━━━━━━━━━━━━━━━━━\n"
        f"📦 Позиции:\n{items_block}\n"
        f"━━━━━━━━━━━━━━━━━━━\n"
        f"💰 Итого: <b>{total:,}₽</b>\n"
        f"🕐 {now}"
    )


def format_contact_message(data: dict) -> str:
    """Формируем сообщение из контактной формы."""
    name = data.get("name", "Не указано")
    contact = data.get("contact", "")
    message = data.get("message", "")
    now = datetime.now().strftime("%d.%m.%Y %H:%M")

    return (
        f"✉️ <b>Новое сообщение с сайта</b>\n"
        f"━━━━━━━━━━━━━━━━━━━\n"
        f"👤 Имя: {name}\n"
        f"📱 Контакт: {contact}\n"
        f"━━━━━━━━━━━━━━━━━━━\n"
        f"💬 Сообщение:\n{message}\n"
        f"━━━━━━━━━━━━━━━━━━━\n"
        f"🕐 {now}"
    )


# ── API-эндпоинты ────────────────────────────────────────────────────────────
@app.route("/api/order", methods=["POST"])
def handle_order():
    """
    Принимает заказ с сайта.
    Body (JSON):
      {
        "name": "Иван",
        "contactType": "telegram" | "whatsapp",
        "contact": "@ivan" | "+77001234567",
        "items": [{"name": "...", "weight": "50г", "qty": 2, "price": 1500}],
        "total": 3000
      }
    """
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"ok": False, "error": "Пустой запрос"}), 400

    contact = data.get("contact", "").strip()
    if not contact:
        return jsonify({"ok": False, "error": "Укажите контакт"}), 400

    log.info("Новый заказ: %s", json.dumps(data, ensure_ascii=False))

    text = format_order_message(data)
    sent = send_telegram(text)

    return jsonify({"ok": sent}), 200 if sent else 500


@app.route("/api/contact", methods=["POST"])
def handle_contact():
    """
    Принимает сообщение из контактной формы.
    Body (JSON):
      {
        "name": "Мария",
        "contact": "@maria или +7...",
        "message": "Хочу узнать про оптовые поставки"
      }
    """
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"ok": False, "error": "Пустой запрос"}), 400

    log.info("Контактная форма: %s", json.dumps(data, ensure_ascii=False))

    text = format_contact_message(data)
    sent = send_telegram(text)

    return jsonify({"ok": sent}), 200 if sent else 500


@app.route("/api/health", methods=["GET"])
def health():
    """Проверка работоспособности."""
    return jsonify({
        "ok": True,
        "bot_configured": bool(BOT_TOKEN and CHAT_ID),
    })


# ── Запуск ────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    log.info("🚀 Cha-hai Bot запущен на http://0.0.0.0:%d", port)
    app.run(host="0.0.0.0", port=port, debug=True)
