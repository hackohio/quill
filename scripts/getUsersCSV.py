from pymongo import MongoClient
​
client = MongoClient('localhost:27017')
users = client.test.users
​
def get_stats():
    attendees = []
    attendees.append(generate_headers())
    cursor = users.find({}, {"_id": 0, "profile": 1, "status": 1, "email": 1})
    for user in cursor:
        if(user['status']['admitted'] and user['status']['confirmed'] and not user['status']['declined']):
            attendees.append(generate_row(user))
    return attendees
​
def generate_headers():
    return "First Name,Last Name,Email,School,Grad Month,Grad Year,Major"
​
def generate_row(user):
    # Seperate profile for easier access
    profile = user['profile']
​
    # Split the name
    name = profile['name'].split()
    first_name = name[0]
    last_name = '' if len(name) == 1 else name[-1]
​
    # Access remaining needed user attributes
    email = user['email']
    school = profile['school'].replace(",", ':')
    grad_month = profile['graduationMonth']
    grad_year = profile['graduationYear']
    major = profile['major'].replace(",", ':')
​
    # Convert to a string which can be a row of the CSV
    row = str([first_name, last_name, email, school, grad_month, grad_year, major])[1:-1].replace("'",'')
    return row
​
csv_rows = get_stats()
​
f = open("attendees.csv", "w")
for row in csv_rows:
    f.write(f'{row}\n')
f.close()