from bot.base import *
from bot.readWrite import *

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

CHARACTER_JSON_PATH = 'configs/MrHustle.json'  # Update this to get character name
#CHARACTER_JSON_PATH = 'configs/HustlinPies.json'  # Update this to get character name
#CHARACTER_JSON_PATH = 'configs/TigBittyBroad.json'  # Update this to get character name
STAT_JSON_PATH = 'configs/autoStat/paladin/basic.json'


autoStat = False
whistle = False
loot_threshold = 4
role = ''



fight_state = 0
attack_counter = 0

fighting = False
cooking = False
fishing = False
running = False

fighting_thread = None
fishing_thread = None
cooking_thread = None

scoring_system = load_scoring_system()

CONFIG = {
    "name": "CharacterName",
    "class": "dps",
    "leader": False,
    "whistle": False,
    "lootThreshold": 4,
    "inventory": [],
    "equipment": {
        "weapon": {},
        "armor": {},
        "charms": [],
        "glyphs": []
    }
}

equipped = []
inventory = []
