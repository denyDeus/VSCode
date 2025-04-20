from kivymd.app import MDApp
from kivymd.uix.screen import Screen
from kivy.lang import Builder

KV = '''
Screen:

    MDTextField:
        id: username
        hint_text: "Enter Username"
        pos_hint: {"center_x": 0.5, "center_y": 0.7}
        size_hint_x: 0.8

    MDTextField:
        id: password
        hint_text: "Enter Password"
        password: True
        icon_right: 'key-variant'
        pos_hint: {"center_x": 0.5, "center_y": 0.6}
        size_hint_x: 0.8
    
    MDCheckbox:
        id: show_password
        pos_hint:{'center_x': 0.25, 'center_y': 0.47}
        on_active:app.toggle_password_visibility(self.active)

    MDLabel:
        text:'Show password'
        pos_hint:{'center_x': 0.55, 'center_y': 0.44}
        halign: 'left'
        size_hint_x: 0.7

    MDRaisedButton:
        text: "Login"
        pos_hint: {"center_x": 0.5, "center_y": 0.45}
        on_release: app.check_credentials()
'''

users = {
    "admin": "1234",
    "user": "pass"
}

class MIZIGOApp(MDApp):
    
    def build(self):
        self.theme_cls.primary_palette = 'Indigo'
        self.theme_cls.primary_hue = 'A700'
        self.theme_cls.theme_style = 'Light'

        screen = Screen()
        username = Builder.load_string(KV)
        password = Builder.load_string(KV)

        screen.add_widget(username)
        screen.add_widget(password)

        return screen
    
    def toggle_password_visibility(self, is_active):
        self.screen.ids.password = not is_active
    
MIZIGOApp().run()