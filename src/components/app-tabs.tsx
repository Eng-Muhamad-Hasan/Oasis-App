// import { NativeTabs } from 'expo-router/unstable-native-tabs';
// import { useColorScheme } from 'react-native';

// import { Colors } from '@/constants/theme';

// export default function AppTabs() {
//   const scheme = useColorScheme();
//   const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

//   return (
//     <NativeTabs
//       backgroundColor={colors.background}
//       indicatorColor={colors.backgroundElement}
//       labelStyle={{ selected: { color: colors.text } }}>
//       <NativeTabs.Trigger name="index">
//         <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
//         <NativeTabs.Trigger.Icon
//           src={require('@/assets/images/tabIcons/home.png')}
//           renderingMode="template"
//         />
//       </NativeTabs.Trigger>

//       <NativeTabs.Trigger name="explore">
//         <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
//         <NativeTabs.Trigger.Icon
//           src={require('@/assets/images/tabIcons/explore.png')}
//           renderingMode="template"
//         />
//       </NativeTabs.Trigger>
//     </NativeTabs>
//   );
// }

import {
  GlassTabBar,
  GlassTabButton,
  TabBarMinimizeProvider,
  renderFadingTabScreen,
  type GlassTabItem,
} from "expo-glass-tabs";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { TabList, TabSlot, TabTrigger, Tabs } from "expo-router/ui";

const ITEMS: (GlassTabItem & { href: string })[] = [
  {
    name: "onboarding",
    href: "/onboarding",
    label: "Onboarding",
    renderIcon: ({ tint }) => (
      <Image
        source={require("../../assets/images/expo-logo.png")}
        tintColor={tint}
        style={{ width: 24, height: 24 }}
      />
    ),
  },
  {
    name: "index",
    href: "/",
    label: "Home",
    renderIcon: ({ tint }) => (
      <Image
        source={require("../../assets/icons/home-glass.png")}
        tintColor={tint}
        style={{ width: 24, height: 24 }}
      />
    ),
  },
  {
    name: "explore",
    href: "/explore",
    label: "Explore",
    renderIcon: ({ tint }) => (
      <Image
        source={require("../../assets/icons/calendar.png")}
        tintColor={tint}
        style={{ width: 24, height: 24 }}
      />
    ),
  },
];

export default function AppTabs() {
  const router = useRouter();
  return (
    <TabBarMinimizeProvider>
      <Tabs>
        <TabSlot style={{ height: "100%" }} renderFn={renderFadingTabScreen} />
        <TabList asChild>
          <GlassTabBar
            onIndexSelected={(i) => router.navigate(ITEMS[i].href as never)}
            theme={{
              activeTint: "#cacaca",
              inactiveTint: "#ccc",
              highlight: "rgba(255,255,255,0.14)", // sliding pill
              glassTint: "rgba(10,10,12,0.55)", // tint over the liquid glass
              solidFallback: "rgba(18,18,20,0.95)", // pre-iOS 26 / Android background
            }}
            haptics={false} // scrub tick (iOS), default true
          >
            {ITEMS.map(({ href, ...item }, index) => (
              <TabTrigger
                key={item.name}
                name={item.name}
                href={href as never}
                renderToHardwareTextureAndroid
                asChild
              >
                <GlassTabButton
                  item={item}
                  renderToHardwareTextureAndroid
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
