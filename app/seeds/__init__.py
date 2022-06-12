from flask.cli import AppGroup
from .users import seed_users, undo_users
from .states import seed_states, undo_states
from .properties import seed_properties, undo_properties
from .property_imgs import seed_property_imgs, undo_property_imgs
from .reviews import seed_reviews, undo_reviews
from .appointments import seed_appointments, undo_appointments
from .agent_area import seed_aa, undo_aa

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_states()
    seed_properties()
    seed_property_imgs()
    seed_reviews()
    seed_appointments()
    seed_aa()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_aa()
    undo_property_imgs()
    undo_properties()
    undo_reviews()
    undo_appointments()
    undo_users()
    undo_states()
    # Add other undo functions here
