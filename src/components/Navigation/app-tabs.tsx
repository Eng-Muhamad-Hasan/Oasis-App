import {
  GlassTabBar,
  GlassTabButton,
  TabBarMinimizeProvider,
  type GlassTabItem,
} from "expo-glass-tabs";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { TabList, TabSlot, TabTrigger, Tabs } from "expo-router/ui";
import { renderFadingTabScreen } from "./fading-tab-slot";

const ITEMS: (GlassTabItem & { href: string })[] = [
  {
    name: "home",
    href: "/home",
    label: "Home",

    renderIcon: ({ tint }) => (
      <Image
        source={
          tint === "activeTint"
            ? require("../../../assets/icons/home-fill.svg")
            : require("../../../assets/icons/home-out.svg")
        }
        tintColor={tint}
        style={{ width: 20, height: 20 }}
      />
    ),
  },
  {
    name: "explore",
    href: "/explore",
    label: "Explore",
    renderIcon: ({ tint }) => (
      <Image
        source={require("../../../assets/icons/explore-out.svg")}
        tintColor={tint}
        style={{ width: 20, height: 20 }}
      />
    ),
  },
  {
    name: "bookings",
    href: "/bookings",
    label: "Bookings",
    renderIcon: ({ tint }) => (
      <Image
        source={require("../../../assets/icons/bookings-out.svg")}
        tintColor={tint}
        style={{ width: 20, height: 20 }}
      />
    ),
  },
  {
    name: "services",
    href: "/services",
    label: "Services",
    renderIcon: ({ tint }) => (
      <Image
        source={require("../../../assets/icons/services-out.svg")}
        tintColor={tint}
        style={{ width: 20, height: 20 }}
      />
    ),
  },
  {
    name: "profile",
    href: "/profile",
    label: "Profile",
    renderIcon: ({ tint }) => (
      <Image
        source={require("../../../assets/icons/profile-out.svg")}
        tintColor={tint}
        style={{ width: 20, height: 20 }}
      />
    ),
  },
];

export default function AppTabs() {
  const router = useRouter();
  return (
    <TabBarMinimizeProvider>
      <Tabs>
        {/* <TabSlot style={{ height: "100%" }} /> */}
        <TabSlot
          style={{ height: "100%" }}
          renderToHardwareTextureAndroid
          renderFn={renderFadingTabScreen}
        />
        <TabList asChild>
          <GlassTabBar
            onIndexSelected={(i) => router.navigate(ITEMS[i].href as never)}
            theme={{
              activeTint: "#000000",
              inactiveTint: "#afafaf",

              highlight: "rgba(0, 0, 0, 0.14)", // sliding pill
              glassTint: "rgba(10,10,12,0.55)", // tint over the liquid glass
              solidFallback: "rgba(255, 255, 255, 0.95)", // pre-iOS 26 / Android background
            }}
            haptics={false} // scrub tick (iOS), default true
          >
            {ITEMS.map(({ href, ...item }, index) => (
              <TabTrigger
                key={item.name}
                name={item.name}
                href={href as never}

                asChild
              >
                <GlassTabButton
                  item={item}

                  index={index}
                />
              </TabTrigger>
            ))}
          </GlassTabBar>
        </TabList>
      </Tabs>
    </TabBarMinimizeProvider>
  );
}
