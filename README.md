# ConfideConnect

## Project Description:

ConfideConnect is a platform that can be used by the United Nations to connect with people who seeks medical assistance for HIV by connecting them with testing centers and medical professionals. The main feature of this application is that all of this are done anonymously without the need of users revealing their identity anywhere until they decide to do so. Additionally the platform will have features to spread awareness through conducting local events and resources related to HIV.

## Key Features:
1. Anonymity: value on privacy. Connect with testing centers and medical professionals without ever revealing your identity until the patient ready.
2. Easy Access to Care: Whether the patient needs advice or want to schedule a test, this platform makes it simple to connect with healthcare professionals who specialize in HIV support.
3. Learn and Grow: Explore a wealth of resources about HIV prevention, treatment, and support services through informative blogs posted by healthcare professionals.
4. Local Events and Awareness: Get involved in local events and awareness campaigns to learn more about HIV and help reduce stigma in your community.
5. Locator: Get access to the local testing centers.
6. Donation: philanthropists will be able to donate money through this platform for United Nations which can be utilized for the social issues.

## Team Details
1. Chethana Benny - benny.c@northeastern.edu
2. Surjith Senthil kumar - senthilkumar.sur@northeastern.edu
3. Panangipalli Naga Venkata Kanaka Satya Harika - panangipalli.n@northeastern.edu
4. Sri Kalyani Sindhura Vajapeyayajula - vajapeyayajula.s@northeastern.edu

## Object Model Diagram:

```mermaid
---
Object Modal
---

classDiagram
    class Person{
        +int id
        +String userName
        +String password
        +String role
        +String gender
        +List~String~ language
    }
    class Patient{
        +int patientId
        + String dateOfBirth
        +List~String~ preExistingConditions
        +String labReport
        +String doctorsPrescription
    }
    class Doctor{
        + String name
        +String email
        +String phoneNumber
        +List~String~ qualifications
        +List~String~ certifications
        +String streetName
        +String city
        +String state
        +String country
        +String zipCode
    }
    class Lab{
        +int id
        +String name
        +String license
        +String contactPerson
        +String contactNumber
        +String email
        +String streetName
        +String city
        +String state
        +String country
        +String zipCode
    }
    class Resources{
        +int id
        +String name
        +String description
        +String date
        +String time
    }
    class Event{
        +String streetName
        +String city
        +String state
        +String country
        +String zipCode
    }
    class Request{
        +int id
        +int patientId
        +String status
        +String notificationRequiredEmail
        +String notificationRequiredPhone
        +String email
        +String phone
        +String createDate
        +String createTime
        +String publishDate
        +String publishTime
        +String name
        +String description
        +String result
    }
    class LabRequest{
        +int labId
        +String streetName
        +String city
        +String state
        +String country
        +String zipCode
    }
    class MedicalRequest{
        +int doctorId
    }
    class Donation{
        +int id
        +String name
        +String amount
        +String date
    }

    Person <|-- Admin
    Person <|-- Patient
    Person <|-- Doctor
    Request <|-- LabRequest
    Request <|-- MedicalRequest
    Resources <|-- Event
    Resources <|-- Blog

    Patient "*" *-- "1" Doctor
    MedicalRequest "1" *-- "1" Patient
    LabRequest "1" *-- "1" Patient
    LabRequest "*" *-- "1" Lab
    Blog "*" o-- "1" Doctor
    
    ```