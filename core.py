import tkinter as tk
from tkinter import simpledialog
import pyautogui
import time
import json
import os
import pytesseract
from PIL import ImageGrab
import random
import keyboard
import sys
import mouse
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains

# Redirect print function
class StdoutRedirector:
    def __init__(self, widget):
        self.widget = widget

    def write(self, message):
        self.widget.insert(tk.END, message)
        self.widget.see(tk.END)

    def flush(self):
        pass

# Global variables and configurations
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
running = False
fighting = False
fight_state = 0

# Selenium setup
def setup_browser():
    chrome_options = Options()
    chrome_options.add_experimental_option("debuggerAddress", "localhost:9222")
    driver = webdriver.Chrome(options=chrome_options, service=Service(r"C:\chromedriver-win64\chromedriver.exe"))
    return driver

def write_to_terminal(message):
    terminal_output.insert(tk.END, message + '\n')
    terminal_output.see(tk.END)

# Function to get player's health and mana
def get_health_mana(driver):
    try:
        wait = WebDriverWait(driver, 10)
        health_element = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".lifeMeter .meterBoxLabel")))
        mana_element = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".manaMeter .meterBoxLabel")))
        health_text = health_element.text.split(" / ")
        mana_text = mana_element.text.split(" / ")
        current_health = int(health_text[0])
        max_health = int(health_text[1])
        current_mana = int(mana_text[0])
        max_mana = int(mana_text[1])
        return {
            "current_health": current_health,
            "max_health": max_health,
            "current_mana": current_mana,
            "max_mana": max_mana
        }
    except Exception as e:
        write_to_terminal(f"Error: {e}")
        return None

# Function to find all monsters and their health
def get_monsters(driver):
    try:
        monsters = driver.find_elements(By.CSS_SELECTOR, ".mobArea .mob")
        monster_list = []
        
        for monster in monsters:
            name_element = monster.find_element(By.CSS_SELECTOR, ".meterBoxLabel")
            health_bar = monster.find_element(By.CSS_SELECTOR, ".lifeMeter .meterBoxProg")
            health_percentage = float(health_bar.get_attribute("style").split("width: ")[1].split("%")[0])
            monster_name = name_element.text

            write_to_terminal(f"Monster: {monster_name}, Health: {health_percentage}%")
            print(f"Monster: {monster_name}, Health: {health_percentage}%")
            monster_list.append({
                "element": monster,
                "name": monster_name,
                "health_percentage": health_percentage
            })

        return monster_list
    except Exception as e:
        write_to_terminal(f"Error: {e}")
        return []

# Function to attack a monster
def attack_monster(driver, monster):
    try:
        write_to_terminal(f"Attacking monster: {monster['name']}")
        actions = ActionChains(driver)
        actions.move_to_element(monster["element"]).click().perform()
    except Exception as e:
        write_to_terminal(f"Error attacking monster: {e}")

# Function to go to town for healing
def town_heal(driver):
    try:
        town_button = driver.find_element(By.CSS_SELECTOR, ".abutGradBl.gradRed")  # Adjust selector as needed
        town_button.click()
        time.sleep(240)  # Adjust healing time as needed
    except Exception as e:
        write_to_terminal(f"Error going to town: {e}")

# Function to check if in town
def is_in_town(driver):
    try:
        town_elements = driver.find_elements(By.CSS_SELECTOR, ".townOption .townOLabel")
        for element in town_elements:
            if "Catacombs" in element.text:
                return True
        return False
    except Exception:
        return False

# Function to check if engage button is visible
def is_engage_button_visible(engage_button):
    try:
        #engage_button = driver.find_element(By.CSS_SELECTOR, ".cataEngage")
        display_style = engage_button.get_attribute("style")
        if "display: block" in display_style:
            return True
        return False
    except Exception:
        return False

# Function to select catacombs when in town
def select_catacombs(driver):
    try:
        town_elements = driver.find_elements(By.CSS_SELECTOR, ".townOption .townOLabel")
        for element in town_elements:
            if "Catacombs" in element.text:
                element.click()
                time.sleep(2)  # Adjust as needed for the game to load
                return
    except Exception as e:
        write_to_terminal(f"Error selecting catacombs: {e}")

# Function to automate fighting
def automate_fighting(driver):
    global fighting, fight_state
    write_to_terminal(f"Fighting: {fighting}")
    
    if fighting:
        if is_in_town(driver):
            select_catacombs(driver)
            
        health_mana_data = get_health_mana(driver)
        if health_mana_data:
            current_health = health_mana_data['current_health']
            max_health = health_mana_data['max_health']
            health_percentage = (current_health / max_health) * 100
            write_to_terminal(f"HP: {health_percentage}")

            if health_percentage < 30:
                town_heal(driver)
        
        monsters = get_monsters(driver)
        if not monsters:
            engage_button = driver.find_element(By.CSS_SELECTOR, ".cataEngage")
            if is_engage_button_visible(engage_button):
                if whistle_var.get():
                    keyboard.send("T")  # Assume T is the hotkey for whistle
                    write_to_terminal("Whistled.")
                if engage_button:
                    engage_button.click()
                    write_to_terminal("Clicked engage button.")

        for monster in monsters:
            if monster["health_percentage"] > 0:
                attack_monster(driver, monster)
                break

        # Schedule next fight action
        overlay.after(1000, lambda: automate_fighting(driver))  # Adjust delay as needed

# Function to start fighting
def fight():
    global fighting
    driver = setup_browser()
    fighting = True
    write_to_terminal("Fight!... ")
    automate_fighting(driver)

# Function to stop automation
def stop_automation():
    global fighting
    fighting = False
    write_to_terminal("Automation stopped by hotkey...")
    os._exit(0)

# Set up the GUI
overlay = tk.Tk()
overlay.title("Slash Hustler")
overlay.geometry("500x600+1450+530")
overlay.attributes('-topmost', True)
overlay.attributes('-alpha', 0.7)
overlay.overrideredirect(True)

fight_button = tk.Button(overlay, bg='black', fg='white', font=('exocet', 9), text="Fight", command=fight)
fight_button.pack()

stop_button = tk.Button(overlay, bg='black', fg='white', font=('exocet', 9), text="Stop", command=stop_automation)
stop_button.pack()

whistle_var = tk.BooleanVar(value=False)  # Set initial value to False
whistle_checkbox = tk.Checkbutton(overlay, text="Whistle", variable=whistle_var, bg='black', fg='white', font=('exocet', 9))
whistle_checkbox.pack()

terminal_output = tk.Text(overlay, bg='black', fg='white', font=('exocet', 9), wrap='word')
terminal_output.pack(expand=True, fill='both')

#sys.stdout = StdoutRedirector(terminal_output)

keyboard.add_hotkey('space', stop_automation)

overlay.mainloop()
