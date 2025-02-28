from flask import Flask, render_template, request, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

def fetch_fragment_data(username):
    url = f'https://fragment.com/username/{username}'
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract relevant information
        username_element = soup.find('span', {'class': 'accent-color'})
        highest_bid_element = soup.find('div', {'class': 'tm-value'})
        buyer_element = soup.find('a', {'class': 'tm-wallet'})
        status_element = soup.find('span', {'class': 'tm-section-header-status'})
        
        if username_element:
            username_text = username_element.text.strip()
            highest_bid = highest_bid_element.text.strip() if highest_bid_element else "N/A"
            buyer = buyer_element.text.strip() if buyer_element else "N/A"
            status = status_element.text.strip() if status_element else "Unknown"
            
            return {
                "username": username_text,
                "highest_bid": highest_bid,
                "buyer": buyer,
                "status": status
            }
    return None

@app.route('/')
def home():
    print("Rendering index.html")  # Debug statement
    return render_template('index.html')

@app.route('/check', methods=['POST'])
def check_usernames():
    usernames = request.json.get('usernames', [])
    results = []
    for username in usernames:
        data = fetch_fragment_data(username)
        if data:
            results.append(data)
        else:
            results.append({"username": username, "error": "Not found on Fragment"})
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
    