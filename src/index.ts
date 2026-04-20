/**
 * Aeros Design System - Public API
 */

export { primitive, buildTokens, fonts } from './tokens';
export type { TokenSet } from './tokens';
export { ThemeProvider, useTheme, useTokens, createThemeConfig } from './theme';
export { variantsMatcher } from './utils';
export type { VariantRule } from './utils';
export { Sparkline } from './utils/Sparkline';
export * as Icons from './icons';
export { SvgIcon } from './icons';
export type { SvgIconProps } from './icons';

// Layout
export { Box } from './components/Box';
export { Stack } from './components/Stack';
export { Paper } from './components/Paper';
export { Divider } from './components/Divider';

// Typography
export { Typography, typographyVariants } from './components/Typography';

// Inputs
export { Button } from './components/Button';
export { IconButton } from './components/IconButton';
export { TextField } from './components/TextField';
export { Select } from './components/Select';
export { MenuItem } from './components/MenuItem';
export { FormControl, InputLabel } from './components/FormControl';
export { FormControlLabel } from './components/FormControlLabel';
export { Switch } from './components/Switch';
export { Checkbox } from './components/Checkbox';
export { Radio } from './components/Radio';
export { Slider } from './components/Slider';
export { NumberField } from './components/NumberField'; // ★ v9

// Data Display
export { Chip } from './components/Chip';
export { Avatar } from './components/Avatar';
export { AvatarGroup } from './components/AvatarGroup';
export { Badge } from './components/Badge';
export { Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from './components/Table';
export { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from './components/List';

// Feedback
export { Alert } from './components/Alert';
export { LinearProgress } from './components/LinearProgress';
export { CircularProgress } from './components/CircularProgress';
export { Skeleton } from './components/Skeleton';

// Surfaces
export { Card, CardContent, CardHeader, CardActions } from './components/Card';
export { Accordion, AccordionSummary, AccordionDetails } from './components/Accordion';

// Navigation
export { AppBar } from './components/AppBar';
export { Toolbar } from './components/Toolbar';
export { Tabs, Tab } from './components/Tabs';
export { ToggleButtonGroup, ToggleButton } from './components/ToggleButtonGroup';
export { Breadcrumbs } from './components/Breadcrumbs';
export { Link } from './components/Link';
export {
  Menubar, MenubarMenu, MenubarTrigger, MenubarContent,
  MenubarItem, MenubarSubmenu, MenubarSeparator,
} from './components/Menubar'; // ★ v9
export { Stepper, Step, StepLabel } from './components/Stepper'; // ★ v9 enhanced

// Overlays
export { Tooltip } from './components/Tooltip';
export { Drawer } from './components/Drawer';
export { Dialog, DialogTitle, DialogContent, DialogActions } from './components/Dialog';

// ★ v9 新コンポーネント (Base UI ベース)
export {
  Chat, ChatHeader, ChatList, ChatMessage, ChatBubble,
  ChatComposer, ChatTypingIndicator, ChatAIAvatar,
} from './components/Chat';
export type {
  ChatProps, ChatHeaderProps, ChatMessageProps, ChatComposerProps,
  MessageVariant, MessageStatus,
} from './components/Chat';

export {
  Schedule, ScheduleMonthView, ScheduleWeekView, ScheduleDayView, ScheduleTimeline,
} from './components/Schedule';
export type { ScheduleProps, ScheduleEvent, ScheduleView } from './components/Schedule';

export { DateField, TimeField, DateTimeField } from './components/DateField';
export type { DateFieldProps, TimeFieldProps, DateTimeFieldProps } from './components/DateField';
