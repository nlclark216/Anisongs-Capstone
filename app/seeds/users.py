from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', 
        email='demo@aa.io', 
        password='password',
        first_name='Demotrius',
        last_name='Walker',
        city='Brooklyn',
        state='NY',
        address='124 First St',
        country='United States'
        )
    marina = User(
        username='marina', 
        email='marina@aa.io', 
        password='password',
        first_name='Marina',
        last_name='Vasquez',
        city='Los Angeles',
        state='CA',
        address='25781 East 23rd Ave',
        country='US'
        )
    alex = User(
        username='alex', 
        email='alex@aa.io', 
        password='password',
        first_name='Alex',
        last_name='Kingston',
        city='Atlanta',
        state='GA',
        address='14 Hwy 85 S',
        country='US'
        )
    gary = User(
        username='gary', 
        email='gary@aa.io', 
        password='password',
        first_name='Gary',
        last_name='Denver',
        city='Miami',
        state='FL',
        address='24367 Higher Cir',
        country='US'
        )
    susan = User(
        username='susan', 
        email='susan@aa.io', 
        password='password',
        first_name='Susan',
        last_name='Fam',
        city='Aspen',
        state='CO',
        address='56 Snowflake Dr',
        country='US'
        )
    lee = User(
        username='lee', 
        email='lee@aa.io', 
        password='password',
        first_name='Lee',
        last_name='Smith',
        city='Indianapolis',
        state='IN',
        address='452 Girdle Ln',
        country='US'
        )

    db.session.add(demo)
    db.session.add(marina)
    db.session.add(alex)
    db.session.add(gary)
    db.session.add(susan)
    db.session.add(lee)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
