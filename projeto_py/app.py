from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)
NOT_FOUND = 404

def conexao():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="0110G",
        database="Loja"
    )

def base_select(sql):
    connection = conexao()
    cursor = connection.cursor()
    cursor.execute(sql)
    result = cursor.fetchone()
    cursor.close()
    connection.close()
    return result

def base_update(sql):
    connection = conexao()
    cursor = connection.cursor()
    cursor.execute(sql)
    connection.commit()
    cursor.close()
    connection.close()
    
def build_update(request, id):
    first_part_update = "UPDATE produtos SET "
    last_part_update = " WHERE id = " + id
    
    mean_words = []
    data = request.get_json()
    for key in data.keys():
        value = data[key]
        mean_words.append(f"{key}=\"{value}\"")
    mean_parts = ",".join(mean_words)
    return first_part_update + mean_parts + last_part_update

@app.route("/user", methods=["PUT"])
def update_user():
    id = request.args.get("id")

    if id == None:
        jsonify({"message":"Inform id if exists"}), NOT_FOUND

    user = base_select("SELECT * FROM produtos WHERE id = " + id)

    if user == None:
        return jsonify({"message": "Product not found"}), NOT_FOUND
    
    update = build_update(request, id)
    base_update(update)

    return jsonify({"message": "Update was done with success"})

if __name__ == "__main__":
    app.run(port=5000, debug=True)