from kivymd.app import MDApp
from kivymd.uix.screen import Screen
from kivy.lang import Builder

username_helper = '''
MDTextField:
    hint_text: 'Enter username'
    pos_hint: {'center_x':0.5, 'center_y':0.5}
    size_hint_x: None
    width: 300
'''

password_helper = '''
MDTextField:
    hint_text: 'Enter Password'
    helper_tetx: 'Forgot Password'
    helper_text_mode: 'persistent' 
    icon_right: 'key'
    pos_hint: {'center_x':0.5, 'center_y':0.5}
    size_hint_x: None
    width: 300
'''

class MIZIGOApp(MDApp):
    
    def build(self):
        self.theme_cls.primary_palette = 'Indigo'
        self.theme_cls.primary_hue = 'A700'
        self.theme_cls.theme_style = 'Dark'

        screen = Screen()
        username = Builder.load_string(username_helper)
        password = Builder.load_string(password_helper)

        return screen