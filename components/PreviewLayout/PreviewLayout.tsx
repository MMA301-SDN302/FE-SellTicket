import { View, TouchableOpacity, Text } from "react-native";
import { type PropsWithChildren } from "react";
import { styles } from "./PreviewLayoutStyle";
import TextInputCommon from "../Common/TextInput/TextInputCommon";

type PreviewLayoutProps = PropsWithChildren<{
  label?: string;
  values?: string[];
  selectedValue?: string;
  setSelectedValue?: (value: string) => void;
  searchText?: string;
  setSearchText?: React.Dispatch<React.SetStateAction<string>>;
}>;

export function PreviewLayout({
  label,
  children,
  values,
  selectedValue,
  setSelectedValue,
  searchText,
  setSearchText,
}: PreviewLayoutProps) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 10 }}>
        {label && <Text style={styles.label}>{label}</Text>}
        {searchText !== undefined && (
          <TextInputCommon
            type={"search"}
            value={searchText}
            fieldName={"searchText"}
            errorName={""}
            icon="search"
            onChangeText={(e) => {
              if (setSearchText) {
                setSearchText(e as string);
              }
            }}
          />
        )}
        <View style={styles.row}>
          {values &&
            values.map(
              (value, _) =>
                setSelectedValue && (
                  <TouchableOpacity
                    key={value}
                    onPress={() => setSelectedValue(value)}
                    style={[
                      styles.button,
                      selectedValue === value && styles.selected,
                      {
                        width:
                          values.length === 2
                            ? "35%"
                            : values.length === 3
                            ? "30%"
                            : values.length === 4
                            ? "20%"
                            : "auto",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.buttonLabel,
                        selectedValue === value && styles.selectedLabel,
                      ]}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {value}
                    </Text>
                  </TouchableOpacity>
                )
            )}
        </View>
      </View>

      {/* Render children directly without wrapping in a scrollable container */}
      {children}
    </View>
  );
}
