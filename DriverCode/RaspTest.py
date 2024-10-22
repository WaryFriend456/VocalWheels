import json
import websocket
import rel

def on_message(ws, message):
    try:
        x = json.loads(message)
        ack_message = {"CAR": "Reached car " + x['direction']}
        ack_message = json.dumps(ack_message)
        ws.send(ack_message)
        
        if x["direction"].upper() == "EMERGENCYSTOP":
            return json.dumps({"status": "The Car has been stopped"})
        elif x["direction"].upper() == "STATUS":
            return json.dumps({"status": "The Car is online"})
        elif x["direction"].upper() == "FORWARD":
            return json.dumps({"status": "Car is moving forward"})
        elif x["direction"].upper() == "BACKWARD":
            return json.dumps({"status": "Car is moving backward"})
        elif x["direction"].upper() == "LEFT":
            return json.dumps({"status": "Car is turning left"})
        elif x["direction"].upper() == "RIGHT":
            return json.dumps({"status": "Car is turning right"})
        else:
            return json.dumps({"status": "PASS"})
    except json.JSONDecodeError:
        return json.dumps({"status": "Decode Error"})

def on_error(ws, error):
    print(error)

def on_close(ws, close_status_code, close_msg):
    print("### closed ###")

def on_open(ws):
    print("Opened connection")
    ws.send(json.dumps({"source": "Raspberry Pi"}))  # Send source message when connection is opened

if __name__ == "__main__":
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("ws://localhost:8081",
                                on_open=on_open,
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close)

    ws.run_forever(dispatcher=rel, reconnect=5)  # Set dispatcher to automatic reconnection,
    rel.signal(2, rel.abort)  # Keyboard Interrupt
    rel.dispatch()