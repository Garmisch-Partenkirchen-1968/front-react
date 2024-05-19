from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory storage for projects (for simplicity)
projects = []
users = [
    {"username": "zeo"},
    {"username": "younghoc"},
    {"username": "kyusulee"},
    {"username": "sukyum"},
]

@app.route('/users', methods=['GET'])
def get_users():
    username_query = request.args.get('username', '')
    filtered_users = [user for user in users if username_query.lower() in user['username'].lower()]
    return jsonify(filtered_users)

@app.route('/projects', methods=['POST'])
def create_project():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    project_name = data.get('projectName', 'untitled')
    project_description = data.get('description', 'untitled')

    new_project = {
        'username': username,
        'password': password,
        'projectName': project_name,
        'description': project_description
    }
    projects.append(new_project)

    return jsonify(new_project), 201

@app.route('/api/projects', methods=['GET'])
def get_projects():
    return jsonify(projects)

if __name__ == '__main__':
    app.run(debug=True)
