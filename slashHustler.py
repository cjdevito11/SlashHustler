import tkinter as tk
from tkinter import simpledialog
import pyautogui
import time
import json
import os
import pytesseract
from PIL import ImageGrab, ImageChops, ImageStat
import random
import keyboard
import sys
import mouse


# Redirect print function
class StdoutRedirector:
    def __init__(self, widget):
        self.widget = widget

    def write(self, message):
        self.widget.insert(tk.END, message)
        self.widget.see(tk.END)

    def flush(self):
        pass

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
normal_state_image_path = 'images/normal_state.png'
snag_image_path = 'images/snag.png'

running = False
reeling = False
total_fishing_attempts = 0
fished_count = 0

fighting = False
killed_count = 0
fight_state = 0

stats_file_path = 'jsons/fishing_stats.json'
stats = {
    'runs': 0,
    'fish_caught': 0,
    'total_experience': 0,
    'total_proficiency': 0
}
paused = False


###### GLOBAL COORDINATES #######

dungeon = (830,300)
arrowUp = (850,225)
arrowRight = (1150,525)
arrowLeft = (550,525)
arrowDown = (850,850)
statusRegion = (25,215,294,266)
fightRegion = (470,150,1220,900)  # Define the region as (x1, y1, x2, y2)
fightingToTownButton = (1300,115)
attack = (85,115)
skillOne = (545,125)
skillTwo = (600,115)
#charmTwo = (185,125)
continueButton = (500,275)
catacombs = (843,322)
fishingToTownButton = (1,1)
###### GLOBAL COORDINATES #######

def init_coordinates():
    global dungeon,arrowUp,arrowRight,arrowLeft,statusRegion,fightRegion,fightingToTownButton,skillOne,skillTwo,continueButton,catacombs,arrowUp,arrowRight,arrowLeft,arrowDown,fishingToTownButton
    
    #skillOne = (545,125)
    #skillTwo = (600,115)
    
    catacombs = find_image('images/catacombs.png')
    
    #enter catacombs
    #arrowUp = (850,225)
    #arrowRight = (1150,525)
    #arrowLeft = (550,525)
    #arrowDown = (850,850)
    fightRegion = (470,150,1220,900)
    #fightingToTownButton = find_image('images/fightingGoToTown.png')
    #continueButton = (500,275)
    
    #Go to Town
    
    #Go into Fishing
    #fishingToTownButton = (1,1)
    
    #zoom first
    #statusRegion = (25,215,294,266)
    #unzoom
    
  
# Function to update the overlay terminal with new messages
def write_to_terminal(message):
    terminal_output.insert(tk.END, message + '\n')
    terminal_output.see(tk.END)

def read_status():
    global statusRegion
    
    write_to_terminal("Try to Read Status")
    time.sleep(.5)
    
    keyboard.press("ctrl")
    time.sleep(.5)
    
    mouse.wheel(1)
    time.sleep(.5)
    
    mouse.wheel(1)
    time.sleep(.5)
    
    keyboard.release("ctrl")
    time.sleep(1)
    
    img = ImageGrab.grab(bbox=statusRegion)
    text = pytesseract.image_to_string(img)  # Use pytesseract to extract text
    write_to_terminal(f"{text}")
    
    keyboard.press("ctrl")
    time.sleep(.5)
    
    mouse.wheel(-1)
    time.sleep(.5)
    
    mouse.wheel(-1)
    time.sleep(.5)
    
    keyboard.release("ctrl")
    time.sleep(1)
    
    write_to_terminal("-Status Text-")
    write_to_terminal(f"{text}")
    print("-Status Text-")
    print(f"{text}")
    time.sleep(1)
    return text
    
def parse_status(text):
    try:
        print("---- parse status ----")
        lines = text.splitlines()

        health_line = lines[0]  # Assuming health is on the first line
        cleaned_health_line = clean_ocr_output(health_line)
        print(f"cleaned_health_line - {cleaned_health_line}")

        mana_line = lines[1]    # Assuming mana is on the second line
        cleaned_mana_line = clean_ocr_output(mana_line)
        print(f"cleaned_mana_line - {cleaned_mana_line}")

        # Splitting the cleaned lines into current and max values
        health_current, health_max = map(int, cleaned_health_line.split('/'))
        mana_current, mana_max = map(int, cleaned_mana_line.split('/'))

        # printing the parsed values; using string conversion to avoid type errors
        print(f"health_current - {health_current}")
        print(f"health_max - {health_max}")
        print(f"mana_current - {mana_current}")
        print(f"mana_max - {mana_max}")

        return health_current, health_max, mana_current, mana_max
    except Exception as e:
        print(f"Failed to parse status: {e}")
        print(f"Problematic OCR Output: {text}")
        return None      

def check_status():
    text = read_status()
    write_to_terminal(f"status text: {text}")
    cleanedText = clean_ocr_output(text)
    write_to_terminal(f"cleaned status text: {cleanedText}")
    status = parse_status(cleanedText)
    
    if status:
        health_current, health_max, mana_current, mana_max = status
        health_percentage = (health_current / health_max) * 100
        mana_percentage = (mana_current / mana_max) * 100
        
        write_to_terminal(f"hp = {health_percentage}")
        write_to_terminal(f"mp = {mana_percentage}")
        
        if health_percentage < 40:  # Threshold for using healing skills
            print("Low health and mana, going to town...")
            write_to_terminal(f"Low Health : Calling townHeal()")
            # Press healing keys
            #pyautogui.press('e')  # Heal key
            #pyautogui.press('r')  # Another heal key
            townHeal()
        
        if health_percentage < 30 and mana_percentage < 30:  # Threshold for going to town
            print("Low health and mana, going to town...")
            townHeal()
            
def clean_ocr_output(ocr_text):
    # Dictionary of common OCR errors and their corrections
    corrections = {
        '@': '0',   # Commonly misinterpreted characters
        '¥': '7',  # Yen symbol misread as 7
        'T': '7',   # T misread as 7
        'O': '0',   # Letter O misread as number 0
        'l': '1',   # Lowercase L misread as number 1
        'S': '5',   # S misread as 5
        'B': '8',   # B misread as 8
        '\'': '',   #change ' to empty
        '"': '',
        '(': '',
        ')': '',
        ':': '7'
    }

    # Replace each incorrect sequence with the correct one
    for wrong, right in corrections.items():
        ocr_text = ocr_text.replace(wrong, right)

    return ocr_text
    
def stop_automation():
    global fight_state, fighting
    print("Automation stopped by hotkey...")
    #fight_state = -10000 
    #fighting = False
    #sys.exit()  # Terminate the program
    #overlay.exit()
    os._exit(0)
    print("still running why?")
    
def randomize_position(position):
    """Apply a small random offset to the position to simulate more human-like clicking."""
    x, y = position
    # Random offset within +/- 10 pixels
    random_offset_x = random.randint(-7, 7)
    random_offset_y = random.randint(-7, 7)
    return (x + random_offset_x, y + random_offset_y)
    
def detect_snag():
    """Detects if a snag has appeared on the screen."""
    # Define the region where "Snag" can appear on your screen
    snag_region = (404, 385, 847, 358)  # Adjust these coordinates to where "Snag" appears
    current_screen = ImageGrab.grab(bbox=snag_region)
    normal_state = Image.open(normal_state_image_path)

    # Compare the current screen with the normal state
    diff = ImageChops.difference(current_screen, normal_state)
    stat = ImageStat.Stat(diff)
    # If there's a significant difference, we assume a snag has appeared
    if stat.sum[0] > 1000:  # You may need to adjust this threshold
        print("Snag detected!")
        snag_location = find_button(snag_image_path)  # You need a snapshot of the snag button
        if snag_location:
            click_button(snag_location, clicks=5, interval=0.25)
            return True
    return False
    
def read_fishing_results():
    # Define the region where fishing results appear on your screen
    # Format: (left_x, top_y, right_x, bottom_y)
    results_region = (285, 515, 940, 620)  # Adjust these coordinates based on where the results appear
    screenshot = ImageGrab.grab(bbox=results_region)
    text = pytesseract.image_to_string(screenshot)

    # Process the text to extract fish caught and experience gained
    # This assumes the OCR text will be formatted similarly to your provided image
    try:
        fish_caught = 1
        lines = text.split('\n')
        experience_line = next(line for line in lines if 'Experience' in line)
        experience_gained = int(experience_line.split('+')[1].split(' ')[0])

        proficiency_line = next(line for line in lines if 'Proficiency' in line)
        proficiency_gained = int(proficiency_line.split('+')[1].split(' ')[0])
    except (ValueError, StopIteration) as e:
        print(f"Could not parse fishing results: {e}")
        experience_gained = 0
        proficiency_gained = 0
        fish_caught = 0

    return fish_caught, experience_gained, proficiency_gained
    
def load_stats():
    if os.path.exists(stats_file_path):
        with open(stats_file_path, 'r') as file:
            return json.load(file)
    else:
        return {'runs': 0, 'fish_caught': 0, 'total_experience': 0, 'proficiency_gained': 0}

def save_stats():
    with open(stats_file_path, 'w') as file:
        json.dump(stats, file, indent=4)

def update_stats(fish_caught, experience_gained, proficiency_gained):
    print("update stats")
    print(f"fish_caught = {fish_caught}")
    print(f"experience_gained = {experience_gained}")
    print(f"proficiency_gained = {proficiency_gained}")
    stats['runs'] += 1
    stats['fish_caught'] += fish_caught  # Corrected from stats['fish_caught'] + fish_caught
    stats['total_experience'] += experience_gained
    stats['total_proficiency'] += proficiency_gained
    save_stats()

def find_button(images, region=None):
    """Find one of the buttons from a list of images on the screen within a given region and return its coordinates."""
    if not isinstance(images, list):  # Ensure the input is a list
        images = [images]  # Convert to list if only one image is provided

    for image in images:
        try:
            button_location = pyautogui.locateCenterOnScreen(image, confidence=0.8, region=region)
            if button_location:
                print(f"Found {image} at {button_location.x}, {button_location.y}")
                return button_location
        except pyautogui.ImageNotFoundException:
            print(f"{image} not found")

    return None

def find_image(images, region=None):
    """Find one of the buttons from a list of images on the screen within a given region and return its coordinates."""
    if not isinstance(images, list):  # Ensure the input is a list
        images = [images]  # Convert to list if only one image is provided

    # Convert region from (x1, y1, x2, y2) to (left, top, width, height)
    if region:
        x1, y1, x2, y2 = region
        region = (x1, y1, x2 - x1, y2 - y1)

    for image in images:
        try:
            button_location = pyautogui.locateCenterOnScreen(image, confidence=0.63, region=region)
            if button_location:
                print(f"Found {image} at {button_location.x}, {button_location.y}")
                return button_location
        except pyautogui.ImageNotFoundException:
            x=1
            #print(f"{image} not found")

    return None

def click_button(button_location, clicks=1, interval=0.1):
    if isinstance(button_location, tuple):
        x, y = button_location  # Unpack the tuple
    else:
        x = button_location.x
        y = button_location.y
        print(f":-- Clicking at {button_location.x}, {button_location.y}")
    pyautogui.click(x, y, clicks=clicks, interval=interval)

def calculate_grid_positions(region, rows=3, columns=3):
    x1, y1, x2, y2 = region
    grid_positions = []
    width = x2 - x1
    height = y2 - y1

    for row in range(rows):
        for col in range(columns):
            x = x1 + (col + 0.5) * (width / columns)
            y = y1 + (row + 0.5) * (height / rows)
            grid_positions.append((int(x), int(y)))

    return grid_positions

def detect_fishing():
    fish_region = (0, 75, 450, 400)
    #found_fishing = pyautogui.locateCenterOnScreen('fishing.png', confidence=0.75, region=fish_region)
    found_fishing = find_image('images/fishScreen.png', fish_region)
    write_to_terminal(f"Fishing? : {found_fishing}")
    if found_fishing:
        to_town = pyautogui.locateCenterOnScreen('backToTown.png', confidence=0.75, region=fish_region)
        click_button(to_town)
        time.sleep(5)
        
#def detect_catacombs():
def townHeal():
    global fightingToTownButton, catacombs, arrowUp, arrowDown, arrowLeft, arrowRight

    click_button(fightingToTownButton)
    write_to_terminal("Going to town for 120 seconds to heal")
    
    time.sleep(59)
    
    write_to_terminal("Back to the fight!")
    click_button(catacombs)
    
    click_button(arrowDown)
    click_button(arrowUp)
    click_button(arrowLeft)
    click_button(arrowRight)
    
def automate_fighting():
    global fightRegion, fighting, skillOne, skillTwo, continueButton, killed_count, fight_state, paused, catacombs, attack
    detect_fishing()
    
    click_button(skillOne)
    #statusText = read_status()
    #if statusText:
    #    write_to_terminal(statusText)
    #status = parse_status(statusText)
    #print(status)
    #if status:
   #     health_current, health_max, mana_current, mana_max = status
   #     health_percentage = (health_current / health_max) * 100
   # check_status()
    catacombs_location = find_image('images/catacombs.png')
    
    if fighting:
        click_button(catacombs)
        if catacombs_location:
            catacombs_location = randomize_position((catacombs_location.x, catacombs_location.y))
            click_button(catacombs_location)
            keyboard.send("a")
            keyboard.send("w")
            keyboard.send("a")
            keyboard.send("w")
            time.sleep(.5)
            
      #  if status:
      #      if health_percentage < 50:  # Threshold to start healing
      #          #pyautogui.press('e')  # Activate first heal skill
       #         pyautogui.press('r')  # Activate second heal skill
#
      #      elif health_percentage >= 70:  # Threshold to stop healing and resume attacks
      #          pyautogui.press('q')  # Switch back to weapon

        # # Random action selection: 80% attack, 20% heal
        # actions = ['attack', 'heal']
        # action_weights = [80, 20]  # 80% attack, 20% heal
        # selected_action = random.choices(actions, weights=action_weights, k=1)[0]

        # if selected_action == 'heal':
            # # Randomly choose between 'e' or 'r' for healing
            # heal_key = random.choice(['e', 'r'])
            # pyautogui.press(heal_key)
            # print(f"Healed using {heal_key}")
            # # Switch back to attack mode
            # pyautogui.press('q')
            # print("Switched back to attack mode with 'q'")
            
        #check_status()
        
        monster_health_location = find_image(['images/fullHealth.png', 'images/fullHealth1.png', 'images/23Health.png', 'images/halfHealth.png', 'images/13health.png'], region=fightRegion)
        if monster_health_location:
            write_to_terminal(f"Found Monster at {monster_health_location.x}, {monster_health_location.y}")
            newX = randomize_position((monster_health_location.x, monster_health_location.y + 100))
            write_to_terminal(f"Updated Monster at {newX[0]}, {newX[1]}")
            click_button(newX, clicks=5, interval=random.uniform(0.09, 0.11))  # Randomize click interval

        engage_location = find_image(['images/engage.png', 'images/engage1.png', 'images/engage2.png', 'images/engage3.png', 'images/engage4.png'], region=fightRegion)
        if engage_location:
            engage_location = randomize_position((engage_location.x, engage_location.y))
            #keyboard.send("T")
            click_button(engage_location, clicks=2, interval=random.uniform(0.95, 1.05))  # Randomize click interval
            
        #if fighting and selected_action == 'attack':
        grid_positions = calculate_grid_positions(fightRegion)
        if (fight_state==7 or fight_state==13 or fight_state==22):
            grid_positions = calculate_grid_positions(fightRegion,9,9)
        random.shuffle(grid_positions)  # Shuffle grid positions to ensure random clicking order
        for position in grid_positions:
            randomized_position = randomize_position(position)
            pyautogui.click(randomized_position)  # Click at each randomized grid position
            time.sleep(random.uniform(0.1, 0.3))  # Random short delay between clicks

        time.sleep(2)
        fight_state = fight_state + 1
        if (fight_state==1 or fight_state==6 or fight_state==11):
            click_button(attack)
            write_to_terminal(" - Attack -")
        if (fight_state==1):
            keyboard.send("Q")
            write_to_terminal("--Fight State 1 - Attack + Skill 1--")
            click_button(skillOne)
        if (fight_state==5):
            keyboard.send("R")
            write_to_terminal("--Fight State 5 - Heal--")
        if (fight_state==6):
            keyboard.send("E")
            time.sleep(.1)
            keyboard.send("E")
            write_to_terminal("--Fight State 6 - Attack + Skill 1--")
            click_button(skillOne)
        if (fight_state==10):
            write_to_terminal("--Fight State 10 - Town Heal--")
            townHeal()
        if (fight_state==12):
            keyboard.send("Q")
            write_to_terminal("--Fight State 12 - Attack + Skill 2--")
            click_button(skillTwo)
        if (fight_state==20):
            write_to_terminal("--Fight State 20 - Town Heal--")
            townHeal()
        if (fight_state==24):
            keyboard.send("R")
            write_to_terminal("--Fight State 24 - Heal--")
        if (fight_state==25):
            fight_state=0
            click_button(continueButton)   
            #keyboard.send("T") ### T is hotkey to "Whistle"
            write_to_terminal("--Fight State 25 - Try to continue--")
            
        write_to_terminal(" - - - Press SPACE to kill - - - ")
    overlay.after(random.randint(8, 12), automate_fighting)  # Randomize the timing slightly

def automate_fishing():
    global running, fished_count, stats, reeling
    #if fished_count == 0:
    #    stats = load_stats()
    
    if running and fished_count < total_fishing_attempts:
        reel_location = find_button('images/reel.png')
        #reel_on_location = find_button('images/reelOn.png')
        reel_mouse_on_location = find_button('images/reelMouseOn.png')
        
        if reel_location:
            reeling = True
            click_button(reel_location, clicks=3, interval=.1)
            
        #reel_on_location = find_button('images/reelOn.png')
       # if reel_on_location:
        #    click_button(reel_on_location, clicks=6, interval=.09)
        
        reel_mouse_on_location = find_button('images/reelMouseOn.png')
        if reel_mouse_on_location:
            click_button(reel_mouse_on_location, clicks=4, interval=.13)
        
        snag_location = find_button('images/snag.png')
        
        while reeling == True:
            print(":--click1")
            click_button(reel_location, clicks=5, interval=.12)
            #detect_snag()
            #print(":--click2")
            #click_button(reel_on_location, clicks=4, interval=.2)
            print(":--click2")
            click_button(reel_mouse_on_location, clicks=4, interval=.11)
            
            print("check recast")
            recast_location = find_button('images/recast.png')
            #print(f"recast_location = " + {recast_location})
            if recast_location:
                reeling = False
                fished_count += 1
                print(f"Recast clicked. Total: {fished_count}/{total_fishing_attempts} times fished")
                counter_label.config(text=f"{fished_count}/{total_fishing_attempts} times fished")
                
                fish_caught, experience_gained, proficiency_gained = read_fishing_results() # Call OCR function to read results
                update_stats(fish_caught, experience_gained, proficiency_gained)
                
                caught_label.config(text=f"{fish_caught} fish caught")
                xp_label.config(text=f"{experience_gained} xp gained")
                prof_label.config(text=f"{proficiency_gained} proficiency gained")
                
                #time.sleep(1)  # Pause before recasting
                click_button(recast_location)
        write_to_terminal("Press SPACE to kill")
       # recast_location = find_button('images/recast.png')
        overlay.after(1, automate_fishing)  # Schedule next check

def startFishing():
    global running, total_fishing_attempts, fished_count
    total_fishing_attempts = simpledialog.askinteger("Input", "How many times do you want to fish?", parent=overlay, minvalue=1, maxvalue=1000)
    if total_fishing_attempts:
        fished_count = 0
        running = True
        print("Automation started...")
        automate_fishing()

def fight():
    global fighting, killed_count
    killed_count = 0
    fighting = True
    print("Fight!...")
    automate_fighting()

def stop():
    global running, fighting
    running = False
    fighting = False
    print("Automation stopped...")



# Set up the GUI
#root = tk.Tk()
#root.title("Game Automation Control")
#root.geometry("300x400+1650+40")
#root.attributes('-topmost', True)

#start_button = tk.Button(root, text="Start Fishing", command=startFishing)
#start_button.pack(pady=5)

#stop_button = tk.Button(root, text="Stop Fishing", command=stop)
#stop_button.pack(pady=5)

#counter_label = tk.Label(root, text="0/0 times fished")
#counter_label.pack(pady=5)

#caught_label = tk.Label(root, text="0 fish caught")
#caught_label.pack(pady=5)

#xp_label = tk.Label(root, text="0 xp earned")
#xp_label.pack(pady=5)

#prof_label = tk.Label(root, text="0 proficiency earned")
#prof_label.pack(pady=5)

#fight_button = tk.Button(root, text="Fight", command=fight)
#fight_button.pack(pady=5)




# Create the overlay terminal window
overlay = tk.Tk()
overlay.title("Slash Hustler")
overlay.geometry("500x600+1450+530")  # Adjust position and size as needed
overlay.attributes('-topmost', True)
overlay.attributes('-alpha', 0.7)  # Set opacity (0.0 to 1.0)
overlay.overrideredirect(True)  # Remove window borders and title bar

init_button = tk.Button(overlay, bg='black', fg='white', font=('exocet', 9), text="Init", command=init_coordinates)
init_button.pack()

fight_button = tk.Button(overlay, bg='black', fg='white', font=('exocet', 9), text="Fight", command=fight)
fight_button.pack()

start_button = tk.Button(overlay, bg='black', fg='white', font=('exocet', 9), text="Start Fishing", command=startFishing)
start_button.pack()

stop_button = tk.Button(overlay, bg='black', fg='white', font=('exocet', 9), text="Stop Fishing", command=stop)
stop_button.pack()

terminal_output = tk.Text(overlay, bg='black', fg='white', font=('exocet', 9), wrap='word')
terminal_output.pack(expand=True, fill='both') 


sys.stdout = StdoutRedirector(terminal_output)

#stats = load_stats()
keyboard.add_hotkey('space', stop_automation)


overlay.mainloop()
