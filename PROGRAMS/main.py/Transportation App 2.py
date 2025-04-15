from kivymd.app import MDApp
from kivy.uix.screenmanager import ScreenManager, Screen
from kivymd.uix.list import OneLineIconListItem, IconLeftWidget
from kivymd.uix.boxlayout import MDBoxLayout
from kivymd.uix.toolbar import MDTopAppBar
from kivymd.uix.navigationdrawer import MDNavigationLayout, MDNavigationDrawer, MDNavigationDrawerMenu
from kivymd.uix.label import MDLabel

class MIZIGOApp(MDApp):
    def build(self):
        self.theme_cls.primary_palette = "Indigo"
        self.theme_cls.primary_hue = "A700"
        self.theme_cls.theme_style = "Light"

        # Root NavigationLayout
        self.nav_layout = MDNavigationLayout()

        # ScreenManager and main screen
        self.screen_manager = ScreenManager()
        self.main_screen = Screen(name="main")
        layout = MDBoxLayout(orientation='vertical')

        toolbar = MDTopAppBar(
            title="Menu",
            left_action_items=[["menu", lambda x: self.nav_drawer.set_state("open")]],
            elevation=10
        )

        layout.add_widget(toolbar)
        layout.add_widget(MDLabel(text="Welcome to MIZIGO",
                                  halign="center",
                                  theme_text_color='Custom',
                                  text_color=(75/255.0, 0, 130/255.0, 1),
                                  font_style='H6'))

        self.main_screen.add_widget(layout)
        self.screen_manager.add_widget(self.main_screen)

        # Navigation Drawer
        self.nav_drawer = MDNavigationDrawer()
        drawer_menu = MDNavigationDrawerMenu()

        self.menu_items = [
            {"text": "Settings", "icon": "cog"},
            {"text": "Create Account", "icon": "account-plus"},
            {"text": "Switch Account", "icon": "account-switch"},
            {"text": "Help", "icon": "help-circle"},
            {"text": "Logout", "icon": "logout"}
        ]

        for item in self.menu_items:
            list_item = OneLineIconListItem(text=item["text"])
            icon = IconLeftWidget(icon=item["icon"])
            list_item.add_widget(icon)
            list_item.bind(on_release=lambda x=item["text"]: self.menu_action(x))
            drawer_menu.add_widget(list_item)

        self.nav_drawer.add_widget(drawer_menu)

        # Add both screen_manager and nav_drawer to nav_layout
        self.nav_layout.add_widget(self.screen_manager)
        self.nav_layout.add_widget(self.nav_drawer)

        return self.nav_layout

    def menu_action(self, item_name):
        print(f"{item_name} selected")
        # Add logic to switch screens or show messages

MIZIGOApp().run()