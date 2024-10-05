from bot.base import *

# Function to select catacombs when in town
def select_catacombs(driver):
    try:
        town_elements = driver.find_elements(By.CSS_SELECTOR, ".townOption .townOLabel")
        for element in town_elements:
            if "Catacombs" in element.text:
                element.click()
                time.sleep(2)  # Adjust as needed for the game to load
                send_keystrokes(driver, "a")
                send_keystrokes(driver, "a")
                return
    except Exception as e:
        print(f"Error selecting catacombs: {e}")

# Function to select catacombs when in town

def selectCooking(driver):
    try:
        town_elements = driver.find_elements(By.CSS_SELECTOR, ".townOption .townOLabel")
        for element in town_elements:
            if "Cooking" in element.text:
                element.click()
                time.sleep(2)  # Adjust as needed for the game to load
                return
    except Exception as e:
        print(f"Error selecting fishing pond: {e}")


def selectFishingPond(driver):
    try:
        town_elements = driver.find_elements(By.CSS_SELECTOR, ".townOption .townOLabel")
        for element in town_elements:
            if "Fishing Pond" in element.text:
                element.click()
                time.sleep(2)  # Adjust as needed for the game to load
                return
    except Exception as e:
        print(f"Error selecting fishing pond: {e}")

def fishingToTown(driver):
    print('fishingToTown')
    try:
        fishToTownButton = driver.find_element(By.CSS_SELECTOR, ".abutGradBl.fishBTT")
        print('click to town')
        if fishToTownButton:
            time.sleep(1)
            fishToTownButton.click()
            print('button clicked')
        return
    except Exception as e:
        print(f"Error rowing boat to town: {e}")