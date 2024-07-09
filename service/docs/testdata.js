// Sample data for creating DB entries
// Patient user
User = {
    "role": "patient",
    "email": "patient1@gmail.com",
    "username": "patient1",
    "password": "patient1"
}

// Doctor user
User = {
    "role": "doctor",
    "email": "doctor1@gmail.com",
    "username": "doctor1",
    "password": "doctor1"
}

// Lab user
User = {
    "role": "lab",
    "email": "lab1@gmail.com",
    "username": "lab1",
    "password": "lab1"
}

Patient = {
    "patientId": "66181cb22f2e6b25e07472e6", 
    "name": "Patient1",
    "phone": "123-456-7890",
    "address": {
        "street": "1234 Elm St",
        "city": "Springfield",
        "state": "IL",
        "country": "USA",
        "zip": "62704"
    },
    "gender": "Male",
    "languagePreference": "English",
    "dob": "1990-01-01"
}

Doctor = {
    "doctorId": "6618a990dffbaa23ca008896",
    "name": "Doctor1",
    "phone": "123-456-7890",
    "address": {
        "street": "1",
        "city": "2",
        "state": "3",
        "country": "4",
        "zip": "5"
    },
    "gender": "F",
    "languagePreference": "third notes",
    "dob": "1964-04-12T04:59:27.122Z",
    "qualifications": "ActionItem1, ActionItem2"
}

Lab = {
    "labId": "6618a990dffbaa23ca008895", 
    "name": "Lab1",
    "phone": "123-456-7890",
    "address": {
        "street": "1",
        "city": "2",
        "state": "3",
        "country": "4",
        "zip": "5"
    }
}
  
MedicalRequest = {
    "patientId": "62bc246e8dabcde987654300", 
    "doctorId": "62bc246e8dabcde123456700", 
    "requestName": "MedicalRequest1",
    "requestDescription": "Annual physical examination",
    "doctorPrescription": "Vitamin supplements",
    "status": "COMPLETED",
    "notificationEmail": "doe@example.com",
    "notificationPhone": "123-456-7890",
    "preExistingConditions": ["Hypertension", "Diabetes"]
}

LabRequest = {
    "labId": "6618a990dffbaa23ca008893",
    "patientId": "6618a990dffbaa23ca008894",
    "requestId": 123,
    "requestName": "LabRequest1",
    "requestDescription": "This is my third notes",
    "labReport": "ActionItem1:1, ActionItem2:2",
    "notificationEmail": "third notes",
    "notificationPhone": "This is my third notes",
    "modifiedTime": "2024-04-12T04:59:27.122Z",
    "preExistingConditions": "This is my third notes",
    "patientAddress": {
        "street": "1",
        "city": "2",
        "state": "3",
        "country": "4",
        "zip": "5"
    }
}

Event = {
    "name": "Event1",
    "description": "Aids info",
    "address": {
        "street": "abc",
        "city": "ahhc",
        "state": "kbgc",
        "country": "abs",
        "zip": "02119"
    },
    "creatorId": "6618a990dffbaa23ca008896"
}

Blog = {
    "name": "Blog1",
    "content": "This is the late stage of HIV infection that occurs when the body's immune system is badly damaged ",
    "creatorId": "6618a990dffbaa23ca008896"
}

Donation = {
    "name": "Donation1",
    "amount": "1000",
    "status": "success"
}