from kivymd.app import MDApp
from kivy.lang import Builder
from kivymd.uix.dialog import MDDialog
from kivymd.uix.button import MDFlatButton

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

class MizigoApp(MDApp):
    dialog = None

    def build(self):
        self.theme_cls.primary_palette = 'Indigo'
        self.theme_cls.primary_hue = 'A700'
        self.theme_cls.theme_style = 'Light'

        self.screen = Builder.load_string(KV)
        return self.screen

    def check_credentials(self):
        username = self.screen.ids.username.text
        password = self.screen.ids.password.text

        if not username or not password:
            message = "Please enter both username and password."
        elif username == 'Denis' and password == '1234':
            message = "Login successful!"
        else:
            message = "Invalid credentials."

        if not self.dialog:
            self.dialog = MDDialog(
                title="Login Status",
                buttons=[MDFlatButton(text="Close", on_release=self.close_dialog)]
            )
        self.dialog.text = message
        self.dialog.open()

    def toggle_password_visibility(self, is_active):
        self.screen.ids.password.password = not is_active

    def close_dialog(self, obj):
        self.dialog.dismiss()

MizigoApp().run()