#If something doesn't work email me @neilmckibben@gmail.com

# pymongo is used to connect to mongoDB
from pymongo import MongoClient
import requests
import filetype
from datetime import datetime
from pymongo import MongoClient
import numpy as np
from pprint import pprint
from pymongo import ReturnDocument
client = MongoClient(MONGO_URI) #Replace with a configured MongoDB URI with read and write access
CONFIRMATION_DATE = #Fill this out with what time they need to confirm by. This value can be found
                    # in the mongoDB settings.
ADMIN_EMAIL = #Fill this out with the admin account you want to log when admitting users (String)
db=client.test
collection = db.users
cursor = collection.find({})

class Scripts:
    # Reads in emails from a text file and converts them into a list. Each email
    # must be seperated by a newline and without commas.
    def read_in_emails_from_file(file_path):
        def emailSet():
            emails = list()
            with open(file_path, 'r') as f:
                emails = ast.literal_eval(f.read())
            return set(emails)
    # Given a valid email that is also verified, this method will set them as admitted
    def admit(email):
        #Prints out the updated object
        pprint(collection.find_one_and_update({
            "email": email,"verified": True},
            {"$set": {
            'status.admitted': True,
            'status.admittedBy': ADMIN_EMAIL,
            'status.confirmBy': CONFIRMATION_DATE}
            },
            return_document=ReturnDocument.AFTER))

    def admit_users():
        emails = emailSet()
        count = 0
        for document in cursor:
            #Checks if participant was to be admitted
            object_email = document["email"]
            if object_email in emails:
                checkIn(object_email)
                count += 1
        print("Admitted: ", count, " users")

    def unconfirm(email):
        pprint(collection.find_one_and_update({
            "email": email,"verified": True},
            {"$set": {
            'status.confirmed': False,
            'confirmation.resume': False}
            },
            return_document=ReturnDocument.AFTER))

    #Method to unconfirm_users given a list() of emails
    def unconfirm_users(uncheck): #uncheck should by of type list()
        for document in cursor:
            object_email = document["email"]
            if object_email in uncheck:
                unconfirm(object_email)


    #Writes to a specified file all the emails of users who are checked in.
    def checked_in_emails(file_name):
        write = open(file_path, 'w')
        for document in cursor:
            object_email = document["email"]
            if (document['status']['checkedIn']):
                write.write(object_email+'\n')

    #Writes to a specified file all the emails of users who are not confirmed.
    def get_confirmed_emails(file_name):
        file = open(file_name, "w")
            for document in cursor:
                if(document['status']['admitted'] and not document['status']['confirmed'] and not document['status']['declined']):
                    file.write(document['email']+"\n")
        file.close()

    #Writes to a specified file all the emails of users have not completed their profile.
    def get_incomplete_profile_emails(file_name):
        file = open(file_name, "w")
        for document in cursor:
            if not (document['verified'] and document['status']['completedProfile']):
                file.write(document['email'] + "\n")
        file.close()

    #Writes to a specified file all the emails of users have not been admitted.
    def get_incomplete_profile_emails(file_name):
        file = open(file_name, "w")
        for document in cursor:
            if(document['status']['completedProfile'] and not document['status']['admitted']):
                file.write(document['email'] + "\n")
        file.close()

    #Writes to a specified file all the emails of users have are confirmed.
    def get_confirmed_emails(file_name):
        file = open(file_name, "w")
        for document in cursor:
            if (document['status']['admitted'] and document['status']['confirmed'] and not document['status']['declined']):
                file.write(document['email'] + "\n")
        file.close()

    #Writes to a specified file all the emails of users have completed their profile.
    def get_complete_profile_emails(file_name):
        file = open(file_name, "w")
        for document in cursor:
            if(document['status']['completedProfile']):
                file.write(document['email'] + "\n")
        file.close()

    #Writes to a specified file all the hardware requested by users.
    def get_hardware_Requests(file_name):
        file = open(file_name, "w")
        for document in cursor:
            if ('hardware' in document['confirmation']):
                file.write(document['confirmation']['hardware'] + "\n")
        file.close()

    #Writes to a specified file all the emails of participants who requested laptops.
    def get_laptop_requests(file_name):
        file = open(file_name, "w")
        for document in cursor:
            # I think this is nested because it crashed if they were all together.
            if not document['status']['declined']:
                if 'wantsLaptop' in document['confirmation']:
                    if document['confirmation']['wantsLaptop']:
                        file.write(document['email'] + "\n")
        file.close()

    #Writes to a specified file all the emails of users have completed their profile.
    def get_completed_profile_emails(file_name):
        file = open(file_name, "w")
        for document in cursor:
            if(document['status']['completedProfile']):
                file.write(document['email'] + "\n")
        file.close()

    #Writes to a specified file all the emails of users have are confirmed and NOT from OSU.
    def non_osu_emails(file_name):
        file = open(file_name, "w")
        for document in cursor:
            object_email = document["email"]
            if not (object_email.endswith('@osu.edu') or object_email.endswith('buckeyemail.osu.edu')):
                if (document['status']['confirmed']):
                    if not document['status']['declined']:
                        info = object_email +'\n'
                        file.write(info)

    #Writes to a specified file all the emails of users have are confirmed and are from OSU. Changed like 2 words
    def non_osu_emails(file_name):
        file = open(file_name, "w")
        for document in cursor:
            object_email = document["email"]
            if (object_email.endswith('@osu.edu') or object_email.endswith('buckeyemail.osu.edu')):
                if (document['status']['confirmed']):
                    if not document['status']['declined']:
                        info = object_email +'\n'
                        file.write(info)

    #Super janky way to download resumes from an AWS S3 bucket when they can only be accessed anonymously
    #This should never be used if the S3 bucket is implemented correctly
    def download_resumes_from_AWS_bucked:
    for document in cursor:
        base = ""#Replace with a string of your S3 bucket connection.
        extension = "" #Extension is used if all types of a set type ex: .pdf
        if document['status']['confirmed']:
            #Genereates URL extension and created query URL
            name = document['email'].replace('@', '%40')
            URL = base+name+extension
            r = requests.get(url = URL)
            chunk_size = 2000
            partial = 'resumes/'+document['email']
            path = 'resumes/'+document['email']+'.pdf'
            with open(path, 'wb') as fd:
                for chunk in r.iter_content(chunk_size):
                    fd.write(chunk)
            #Checks file type using filetype package
            kind = filetype.guess(path)
            if kind is not None:
                print(kind.extension)
                if kind.extension != '.pdf':
                    #Reformates file if not pdf
                    new = partial + '.'+kind.extension
                    #.zip tend to end up being .docx
                    if kind.extension == 'zip':
                        new = partial + '.docx'
                    os.rename(path, new)
            else:
                print('kind is none for file: '+path)

    def get_stats():
        attendees = []
        attendees.append(generate_headers())
        cursor = users.find({}, {"_id": 0, "profile": 1, "status": 1, "email": 1})
        for user in cursor:
            if(user['status']['admitted'] and user['status']['confirmed'] and not user['status']['declined']):
                attendees.append(generate_row(user))
        return attendees

    def generate_headers():
        return "First Name,Last Name,Email"

    def get_path(email):
        files = os.listdir('resumes/')
        matching = [s for s in files if email in s]
        if matching:
            return matching[0]

    def generate_row(user):
        # Seperate profile for easier access
        profile = user['profile']
        # Split the name
        name = profile['name'].split()
        first_name = name[0]
        last_name = '' if len(name) == 1 else name[-1]
        # Access remaining needed user attributes
        email = user['email']
        school = profile['school'].replace(",", ':')
        print(email)
        grad_month = profile['graduationMonth']
        grad_year = profile['graduationYear']
        major = profile['major'].replace(",", ':')
        path = ''
        file_name = get_path(email)
        if file_name is not None:
            path = '/resumes/'+file_name
        # Convert to a string which can be a row of the CSV
        row = str([first_name, last_name, email, school, grad_month, grad_year, major, path])[1:-1].replace("'",'')
        return row

    #Generates full csv with appropriate information

    #Also use this command for a FULL dump:
    # mongoexport --uri='mongodb://quillServer:OHIOathon%24ServerPassword@10.0.101.56:27017/Quill?authSource=Quill' --forceTableScan --collection users --type csv -f profile.name,email,verified,status.completedProfile,status.admitted,status.confirmed,status.declined,status.checkedIn,profile.major,profile.gender,profile.school,profile.degree,profile.graduationMonth,profile.graduationYear,profile.essay,profile.description,profile.swag,confirmation.shirtSize,confirmation.phoneNumber,confirmation.ethnicity,teamCode,confirmation.notes,confirmation.wantsAWSAccount --out dump.csv
    #Add additional fields as needed
    def csc_export():
        csv_rows = get_stats()
        f = open("attendees.csv", "w")
        for row in csv_rows:
            f.write(f'{row}\n')
        f.close()
