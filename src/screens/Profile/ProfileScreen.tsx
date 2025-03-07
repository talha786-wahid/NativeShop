import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useTheme} from '@src/styles/ThemeProvider';
import {ScreenWrapper} from '@src/components';
import {
  ChevronRight,
  Clock,
  Bell,
  CreditCard,
  MessageCircle,
  Lock,
  HelpCircle,
  LogOut,
  User,
} from 'lucide-react-native';

const ProfileScreen = () => {
  const theme = useTheme();

  const renderMenuItem = (
    icon: React.ReactNode,
    label: string,
    onPress: () => void,
  ) => (
    <TouchableOpacity
      style={[styles.menuItem, {borderBottomColor: theme.colors.neutral[100]}]}
      onPress={onPress}>
      <View style={styles.menuItemLeft}>
        {icon}
        <Text style={[styles.menuItemLabel, {color: theme.colors.black}]}>
          {label}
        </Text>
      </View>
      <ChevronRight size={20} color={theme.colors.neutral[400]} />
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, {color: theme.colors.black}]}>
            Profile
          </Text>
        </View>

        <View style={styles.userInfo}>
          <View
            style={[
              styles.avatarPlaceholder,
              {backgroundColor: theme.colors.primary[50]},
            ]}>
            <User size={32} color={theme.colors.primary[600]} />
          </View>
          <View style={styles.userDetails}>
            <Text style={[styles.userName, {color: theme.colors.black}]}>
              Sophie Anderson
            </Text>
            <Text
              style={[styles.userEmail, {color: theme.colors.neutral[400]}]}>
              sophie@example.com
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.editButton,
              {backgroundColor: theme.colors.neutral[50]},
            ]}>
            <Text
              style={[
                styles.editButtonText,
                {color: theme.colors.neutral[600]},
              ]}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.black}]}>
            Account Settings
          </Text>
          {renderMenuItem(
            <Clock
              size={20}
              color={theme.colors.neutral[600]}
              style={styles.menuIcon}
            />,
            'Order History',
            () => {},
          )}
          {renderMenuItem(
            <Bell
              size={20}
              color={theme.colors.neutral[600]}
              style={styles.menuIcon}
            />,
            'Notifications',
            () => {},
          )}
          {renderMenuItem(
            <CreditCard
              size={20}
              color={theme.colors.neutral[600]}
              style={styles.menuIcon}
            />,
            'Payment Methods',
            () => {},
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.black}]}>
            Support
          </Text>
          {renderMenuItem(
            <MessageCircle
              size={20}
              color={theme.colors.neutral[600]}
              style={styles.menuIcon}
            />,
            'Contact Us',
            () => {},
          )}
          {renderMenuItem(
            <Lock
              size={20}
              color={theme.colors.neutral[600]}
              style={styles.menuIcon}
            />,
            'Privacy Policy',
            () => {},
          )}
          {renderMenuItem(
            <HelpCircle
              size={20}
              color={theme.colors.neutral[600]}
              style={styles.menuIcon}
            />,
            'Terms & Conditions',
            () => {},
          )}
        </View>

        <TouchableOpacity
          style={[styles.logoutButton, {borderColor: theme.colors.error[600]}]}>
          <LogOut size={20} color={theme.colors.error[600]} />
          <Text style={[styles.logoutText, {color: theme.colors.error[600]}]}>
            Log out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  userInfo: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIcon: {
    width: 20,
  },
  menuItemLabel: {
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 32,
    marginBottom: 16,
    marginHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
