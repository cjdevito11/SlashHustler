from bot.base import *

abilitiesMap = {
    "row1": ["powerstrike", "bottomsup", "topsmash", "knockdown", "retribution", "healrage"],
    "row2": ["backstab", "backastrophe", "multistrike", "twohitback", "revenge", "doublestrike"],
    "row3": ["crossstrike", "pathslash", "jumpattack", "wildswing", "slapdash", "xin"],
    "row4": ["Castabove", "Piercecast", "Powercast", "Pillarcast", "Multiheal", "Salvation"],
    "row5": ["Castabove", "Piercecast", "Powercast", "Pillarcast", "Multiheal", "Salvation"],
    "row6": ["Castabove", "Piercecast", "Powercast", "Pillarcast", "Multiheal", "Salvation"]
}
flattened_abilities = abilitiesMap["row1"] + abilitiesMap["row2"] + abilitiesMap["row3"] + abilitiesMap["row4"] + abilitiesMap["row5"] + abilitiesMap["row6"]

#### AUTO SKILL ####

def map_abilities(driver):
    try:
        # Find all the ability icons in the order they appear in the HTML
        ability_icons = driver.find_elements(By.CSS_SELECTOR, "div.cp.abilityIcon")
        
        # Make sure we have the same number of ability icons as in the abilities map
        if len(ability_icons) != len(flattened_abilities):
            print(f"Mismatch in number of abilities: found {len(ability_icons)} icons, expected {len(flattened_abilities)}.")
            return
        
        # Create a mapping of the ability icons to their respective names from the flattened abilities list
        ability_mapping = {}
        for index, icon in enumerate(ability_icons):
            # Map the icon to its corresponding ability based on the order
            ability_name = flattened_abilities[index]
            ability_mapping[ability_name] = icon

        print("Ability mapping completed successfully!")
        print(ability_mapping)
        
        return ability_mapping

    except Exception as e:
        print(f"Error mapping abilities: {e}")
        return None

# Function to get current levels of abilities based on the order in abilitiesMap
def read_ability_levels(driver):
    try:
        # Find all the ability icons
        ability_icons = driver.find_elements(By.CSS_SELECTOR, "div.cp.abilityIcon")

        # Dictionary to store current ability levels
        current_levels = {}

        # We assume the abilities are mapped in the same order as in abilitiesMap
        for index, icon in enumerate(ability_icons):
            try:
                level_element = icon.find_element(By.CLASS_NAME, 'stAbLvl')  # Find the level element
                ability_level = int(level_element.text.strip())  # Get the level as an integer
                ability_name = flattened_abilities[index]  # Map it to the correct ability name based on the order
                current_levels[ability_name] = ability_level  # Store the level in the dictionary
                print(f"{ability_name}: Lvl({ability_level})")
            except Exception as e:
                # Handle the case where the level element is not found or there's an error
                ability_name = flattened_abilities[index]  # Get the ability name from abilitiesMap
                current_levels[ability_name] = 0  # Set the level to 0 or any default value
                print(f"Error reading level for ability {ability_name}: {e}")

        return current_levels

    except Exception as e:
        print(f"Error reading ability levels: {e}")
        return {}
    

# Function to spend ability points based on thresholds from JSON
def spend_ability_points_based_on_thresholds(driver, ability_mapping, points_to_spend, skill_thresholds, current_levels):
    print('Spend_ability_points')
    try:
        # Normalize skill thresholds and current levels by converting all keys to lowercase
        skill_thresholds = {key.lower(): value for key, value in skill_thresholds.items()}
        current_levels = {key.lower(): value for key, value in current_levels.items()}
        
        # Iterate through abilities in the skill thresholds
        for ability, max_threshold in skill_thresholds.items():
            if points_to_spend <= 0:
                break

            current_level = current_levels.get(ability, 0)  # Fetch the current level of the ability
            print(f'current_level for {ability}: {current_level}')
            
            # Check if current ability level is below the defined threshold
            if current_level < max_threshold:
                print(f'{ability}: Current Level < max Threshold - SPEND POINT')
                points_needed = max_threshold - current_level
                points_to_allocate = min(points_needed, points_to_spend)

                # Find the corresponding ability icon and click it to allocate points
                if ability in ability_mapping:
                    print(f'ability: {ability}')
                    ability_icon = ability_mapping[ability] 
                    print(f'ability_icon: {ability_icon}')
                    
                    for _ in range(points_to_allocate):
                        try:
                            # Use the same method you use for other clicks (direct click)
                            print(f'Try to click Ability Icon : {ability_icon}')
                            ability_icon.click()
                            points_to_spend -= 1
                            print(f"Allocated a point to {ability}. Points remaining: {points_to_spend}")
                            time.sleep(1)  # Delay to prevent rapid clicks
                        except Exception as e:
                            print(f"Failed to click {ability_icon} for {ability}: {e}")
                            continue

                    if points_to_spend <= 0:
                        break

        if points_to_spend == 0:
            print("All points allocated successfully.")
        else:
            print(f"Remaining points: {points_to_spend}.")
    
    except Exception as e:
        print(f"Error spending ability points based on thresholds: {e}")

# Combined function for auto stat and ability allocation
def auto_stat_and_ability_allocation(driver, config_path):
    print('---------------------auto_stat_and_ability_allocation---------------------------')
    print('---------------------auto_stat_and_ability_allocation---------------------------')
    print('---------------------auto_stat_and_ability_allocation---------------------------')
    try:
        # Step 1: Load the JSON config to get skill thresholds
        config = load_stats_config(config_path)
        if not config:
            return

        skill_thresholds = config.get("skills", {})

        # Step 2: Read current player stats (to get ability points)
        current_stats = readPlayerStats(driver)
        ability_points = current_stats.get("ability_points", 0)

        print(f"Ability points available: {ability_points}")

        # Step 3: Check if there are any ability points to spend
        if ability_points > 0:
            # Step 4: Map abilities in the UI
            ability_mapping = map_abilities(driver)

            if ability_mapping:
                # Step 5: Read current ability levels from the UI
                current_ability_levels = read_ability_levels(driver)

                print(f'ability_mapping: {ability_mapping}')
                print(f'ability_points: {ability_points}')
                print(f'skill_thresholds: {skill_thresholds}')
                print(f'current_ability_levels: {current_ability_levels}')
                print('spend_ability_points_based_on_thresholds(driver, ability_mapping, ability_points, skill_thresholds, current_ability_levels)')
                # Step 6: Spend ability points based on the thresholds in the JSON
                spend_ability_points_based_on_thresholds(driver, ability_mapping, ability_points, skill_thresholds, current_ability_levels)
            else:
                print("Failed to map abilities.")
        else:
            print("No ability points available to spend.")

    except Exception as e:
        print(f"Error in auto stat and ability allocation: {e}")




#### AUTO SKILL ####

#### AUTO STAT ####

def readPlayerStats(driver):
    try:
        stats = {
            "level": 0,
            "exp": 0,
            "next_level": 0,
            "str": 0,
            "dex": 0,
            "int": 0,
            "vit": 0,
            "stat_points": 0,
            "ability_points": 0,
            "kills": 0,
            "deaths": 0,
            "damage": "0 to 0",  # Treat as string for range
            "physical_def": "0 to 0",  # Treat as string for range
            "magical_def": "0 to 0"  # Treat as string for range
        }

        # Retrieve and parse each stat
        stats["level"] = int(driver.find_element(By.ID, "CS0").text.strip())
        stats["exp"] = int(driver.find_element(By.ID, "CS1").text.strip())
        stats["next_level"] = int(driver.find_element(By.ID, "CS2").text.strip())
        stats["str"] = int(driver.find_element(By.ID, "CS3").text.strip())
        stats["dex"] = int(driver.find_element(By.ID, "CS4").text.strip())
        stats["int"] = int(driver.find_element(By.ID, "CS5").text.strip())
        stats["vit"] = int(driver.find_element(By.ID, "CS6").text.strip())
        stats["stat_points"] = int(driver.find_element(By.ID, "CS7").text.strip())
        stats["ability_points"] = int(driver.find_element(By.ID, "CS8").text.strip())
        stats["kills"] = int(driver.find_element(By.ID, "CS9").text.strip())
        stats["deaths"] = int(driver.find_element(By.ID, "CS10").text.strip())
        
        # Damage and defense are ranges, so handle them as strings
        stats["damage"] = driver.find_element(By.ID, "CS11").text.strip()
        stats["physical_def"] = driver.find_element(By.ID, "CS12").text.strip()
        stats["magical_def"] = driver.find_element(By.ID, "CS13").text.strip()

        return stats
    except Exception as e:
        print(f"Error reading player stats: {e}")
        return stats  # Return the stats dictionary with default values if there's an issue
    



def spendStatPoints(driver, config_path):
    try:
        # Load config
        config = load_stats_config(config_path)
        if config is None:
            return

        desired_vitality = config["stats"].get("vitality", 0)
        desired_strength = config["stats"].get("strength", 0)

        # Get current stats
        current_stats = readPlayerStats(driver)
        vitality = current_stats["vit"]  # Current vitality
        strength = current_stats["str"]  # Current strength
        stat_points = current_stats["stat_points"]  # Available stat points

        # Distribute stat points
        points_to_vitality = max(0, desired_vitality - vitality)
        points_to_strength = max(0, desired_strength - strength)

        total_points_needed = points_to_vitality + points_to_strength

        if total_points_needed <= 0:
            print("Stats already at desired levels.")
            return

        # Allocate points with re-finding elements to prevent stale element reference
        while stat_points > 0:
            if points_to_vitality > 0:
                # Wait until the vitality button is clickable, then click it
                vitality_button = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable((By.CSS_SELECTOR, "div#CS6 svg"))
                )
                vitality_button.click()
                points_to_vitality -= 1
                stat_points -= 1

            elif points_to_strength > 0:
                # Wait until the strength button is clickable, then click it
                strength_button = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable((By.CSS_SELECTOR, "div#CS3 svg"))
                )
                strength_button.click()
                points_to_strength -= 1
                stat_points -= 1

            # Re-check stat points to ensure they are still available
            current_stats = readPlayerStats(driver)
            stat_points = current_stats["stat_points"]

        print("Stat points allocated successfully.")

    except Exception as e:
        print(f"Error spending stat points: {e}")




#### AUTO STAT ####