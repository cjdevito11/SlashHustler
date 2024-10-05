from bot.base import *

def load_scoring_system():
    with open('jsons/itemScore.json', 'r') as file:
        scoring_system = json.load(file)
        print('Loaded scoring system:', json.dumps(scoring_system, indent=4))  # Print the entire JSON for debugging
        return scoring_system

# Function to read the configuration file
def load_stats_config(file_path):
    try:
        with open(file_path, 'r') as config_file:
            return json.load(config_file)
    except Exception as e:
        print(f"Error loading config: {e}")
        return None