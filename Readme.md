
# WhatsApp Message Api

Created an microservice for WhatsApp Bussines Account clients to handle contacts of their customers or clients to send messages or advertisments in one click.

## WhatsApp Integration
This system integrates with the **official WhatsApp Business Cloud API** provided by Meta.
It allows businesses to send messages directly to their customers' WhatsApp accounts using secure API calls.


## Tech Stack

**Client:** React, TailwindCSS

**Server:** Javascript, Python(Flask)

**Databse:** Mysql, ORM(sqlAlchemy)

## API Reference

#### Get all contatcs

```http
  GET /show_contacts/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `none` | `none` | To fetch all contacts |

#### Add contatcs

```http
  POST /add_contacts
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `none` | To add contact |

#### Update Contact

```http
  PUT /update_contact/id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required** to update contact |

#### DELETE Contact

```http
  DELETE /delete_contact/id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required** to delete contact |

### WhatsApp Api Integartion
WHATSAPP_TOKEN = "Permanent Access Token"

PHONE_NUMBER_ID = "Phone Number Id"

Here, you should add your Permanent Access Token and Phone Number Id provided by WhatsApp after creating WhatsApp Bussines Api.

#### To send message

```http
  POST /send_message
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `none` | **Required** to send message |


## Contributing

Contributions are always welcome!
Please find a bug(s) and also if possible give your solutions to fix so we can find most ideal way to fix the bug

## 🚀 About Me
Hi! I'm **Atharv**, a full-stack developer passionate about building practical, real-world applications.  
I enjoy working with **Python, Flask, React, and APIs**, and I love turning ideas into working solutions.

This project was created as part of my learning and exploration of **API integration** and **full-stack development** using real-world tools like the **WhatsApp Business Cloud API**.

But I am mostly inclined towards **Backend** part cause want to expand my skillset in AI/ML

### 🌱 Currently exploring:
- REST API design
- Scalable Backend models
