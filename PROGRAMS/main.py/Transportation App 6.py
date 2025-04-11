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
        pos_hint: {"center_x": 0.5, "center_y": 0.6}
        size_hint_x: 0.8

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

    def close_dialog(self, obj):
        self.dialog.dismiss()

MizigoApp().run()