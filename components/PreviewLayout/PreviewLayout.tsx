import { View, TouchableOpacity, Text } from "react-native";
import type { PropsWithChildren } from "react";
import { styles } from "./PreviewLayoutStyle";
type PreviewLayoutProps = PropsWithChildren<{
  label: string;
  values?: string[];
  selectedValue?: string;
  setSelectedValue?: (value: string) => void;
}>;

export const PreviewLayout = ({
  label,
  children,
  values,
  selectedValue,
  setSelectedValue,
}: PreviewLayoutProps) => (
  <View style={{ padding: 10, flex: 1 }}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.row}>
      {values &&
        values.map(
          (value) =>
            setSelectedValue && (
              <TouchableOpacity
                key={value}
                onPress={() => setSelectedValue(value)}
                style={[
                  styles.button,
                  selectedValue === value && styles.selected,
                ]}
              >
                <Text
                  style={[
                    styles.buttonLabel,
                    selectedValue === value && styles.selectedLabel,
                  ]}
                >
                  {value}
                </Text>
              </TouchableOpacity>
            )
        )}
    </View>
    <View style={[styles.container, { [label]: selectedValue }]}>
      {children}
    </View>
  </View>
);
