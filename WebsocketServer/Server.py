from websocket_server import WebsocketServer
import json
routes = {}


def new_client(client, server):
    print("New client connected and was given id %d" % client['id'])


def client_left(client, server):
    print("Client(%d) disconnected" % client['id'])
    for key in routes:
        if routes[key] == client:
            del routes[key]
            break


def message_received(client, server, message):
    print("Client(%d) said: %s" % (client['id'], message))
    try:
        message = json.loads(message)
    except json.JSONDecodeError:
        print("Invalid JSON format received")
        return

    if "source" in message:
        routes[message['source']] = client
        print(routes)
    if "direction" in message:
        print("website: ", message)
        message = json.dumps(message)
        server.send_message(routes['Raspberry Pi'], message)
    if "CAR" in message:
        print("raspberry: ", message)
        message = json.dumps(message)
        if 'Alexa' in routes:
            server.send_message(routes['Alexa'], message)
        elif 'website' in routes:
            server.send_message(routes['website'], message)
    if "status" in message:
        print("Website: ", message)
        if 'Raspberry Pi' in routes:
            message = json.dumps({"status": "Online"})
            print("sending: ", message)
            server.send_message(routes['front'], message)
        else:
            message = json.dumps({"status": "Offline"})
            server.send_message(routes['front'], message)


PORT = 8081
server = WebsocketServer(port=PORT, host="0.0.0.0")
server.set_fn_new_client(new_client)
server.set_fn_client_left(client_left)
server.set_fn_message_received(message_received)
server.run_forever()
