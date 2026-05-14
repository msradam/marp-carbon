'use strict';

const { white, g100 } = require('@carbon/themes');
const colors = require('@carbon/colors');

// IBM categorical palette for diagram color scales (pie, mindmap, quadrant, etc.)
// Ordered for visual separation on both light and dark backgrounds.
const CSCALE_LIGHT = [
  colors.blue60,    // IBM Blue
  colors.teal60,    // IBM Teal
  colors.purple60,  // IBM Purple
  colors.cyan50,    // IBM Cyan
  colors.green60,   // IBM Green
  colors.magenta60, // IBM Magenta
  colors.orange40,  // IBM Orange
  colors.coolGray50,// neutral
  colors.red60,     // IBM Red
  colors.blue40,    // IBM Blue light
  colors.teal40,    // IBM Teal light
  colors.yellow30,  // IBM Yellow
];

const CSCALE_DARK = [
  colors.blue50,    // IBM Blue (dark-mode accessible)
  colors.teal40,
  colors.purple40,
  colors.cyan40,
  colors.green40,
  colors.magenta40,
  colors.orange40,
  colors.coolGray50,
  colors.red40,
  colors.blue40,
  colors.teal50,
  colors.yellow30,
];

function cScaleEntries(scale) {
  return Object.fromEntries(scale.map((v, i) => [`cScale${i}`, v]));
}

const light = {
  theme: 'base',
  themeVariables: {
    // Base palette
    background:           white.background,
    primaryColor:         white.layer01,
    primaryTextColor:     white.textPrimary,
    primaryBorderColor:   white.borderStrong01,
    secondaryColor:       white.layer02,
    secondaryTextColor:   white.textSecondary,
    secondaryBorderColor: white.borderSubtle01 ?? white.borderSubtle00,
    tertiaryColor:        white.layer01,
    tertiaryTextColor:    white.textPrimary,
    tertiaryBorderColor:  white.borderSubtle01 ?? white.borderSubtle00,

    // Lines and text
    lineColor:            white.textPrimary,
    textColor:            white.textPrimary,
    mainBkg:              white.layer01,
    nodeBkg:              white.layer01,
    nodeBorder:           white.borderStrong01,
    clusterBkg:           white.background,
    clusterBorder:        white.borderSubtle00,
    defaultLinkColor:     white.interactive,
    titleColor:           white.textPrimary,
    edgeLabelBackground:  white.background,
    labelBackground:      white.background,
    labelColor:           white.textPrimary,

    // Typography
    fontFamily:           "'IBM Plex Sans', sans-serif",
    fontSize:             '16px',

    // Sequence diagrams
    actorBkg:             white.layer01,
    actorBorder:          white.borderStrong01,
    actorTextColor:       white.textPrimary,
    actorLineColor:       white.borderStrong01,
    signalColor:          white.textPrimary,
    signalTextColor:      white.textPrimary,
    labelBoxBkgColor:     white.layer01,
    labelBoxBorderColor:  white.borderSubtle00,
    labelTextColor:       white.textPrimary,
    loopTextColor:        white.textPrimary,
    noteBorderColor:      white.borderSubtle00,
    noteBkgColor:         white.layer02,
    noteTextColor:        white.textPrimary,
    activationBorderColor: white.interactive,
    activationBkgColor:   white.layer01,

    // Gantt
    sectionBkgColor:      white.layer01,
    altSectionBkgColor:   white.background,
    sectionBkgColor2:     white.layer02,
    taskBorderColor:      white.interactive,
    taskBkgColor:         white.interactive,
    taskTextColor:        white.textOnColor,
    taskTextLightColor:   white.textOnColor,
    taskTextDarkColor:    white.textPrimary,
    activeTaskBorderColor: white.interactive,
    activeTaskBkgColor:   colors.blue40,
    gridColor:            white.borderSubtle00,
    doneTaskBkgColor:     white.borderSubtle00,
    doneTaskBorderColor:  white.borderStrong01,
    critBorderColor:      white.supportError,
    critBkgColor:         white.supportError,
    todayLineColor:       white.supportWarning,

    // Error states
    errorBkgColor:        white.supportError,
    errorTextColor:       white.textOnColor,

    // Categorical color scale
    ...cScaleEntries(CSCALE_LIGHT),
  },
};

const dark = {
  theme: 'base',
  themeVariables: {
    background:           g100.background,
    primaryColor:         g100.layer01,
    primaryTextColor:     g100.textPrimary,
    primaryBorderColor:   g100.borderStrong01,
    secondaryColor:       g100.layer02,
    secondaryTextColor:   g100.textSecondary,
    secondaryBorderColor: g100.borderSubtle01 ?? g100.borderSubtle00,
    tertiaryColor:        g100.layer01,
    tertiaryTextColor:    g100.textPrimary,
    tertiaryBorderColor:  g100.borderSubtle01 ?? g100.borderSubtle00,

    lineColor:            g100.textSecondary,
    textColor:            g100.textPrimary,
    mainBkg:              g100.layer01,
    nodeBkg:              g100.layer01,
    nodeBorder:           g100.borderStrong01,
    clusterBkg:           g100.background,
    clusterBorder:        g100.borderSubtle00,
    defaultLinkColor:     g100.interactive,
    titleColor:           g100.textPrimary,
    edgeLabelBackground:  g100.layer01,
    labelBackground:      g100.layer01,
    labelColor:           g100.textPrimary,

    fontFamily:           "'IBM Plex Sans', sans-serif",
    fontSize:             '16px',

    actorBkg:             g100.layer01,
    actorBorder:          g100.borderStrong01,
    actorTextColor:       g100.textPrimary,
    actorLineColor:       g100.borderStrong01,
    signalColor:          g100.textPrimary,
    signalTextColor:      g100.textPrimary,
    labelBoxBkgColor:     g100.layer01,
    labelBoxBorderColor:  g100.borderSubtle00,
    labelTextColor:       g100.textPrimary,
    loopTextColor:        g100.textPrimary,
    noteBorderColor:      g100.borderSubtle00,
    noteBkgColor:         g100.layer02,
    noteTextColor:        g100.textPrimary,
    activationBorderColor: g100.interactive,
    activationBkgColor:   g100.layer01,

    sectionBkgColor:      g100.layer01,
    altSectionBkgColor:   g100.background,
    sectionBkgColor2:     g100.layer02,
    taskBorderColor:      g100.interactive,
    taskBkgColor:         g100.interactive,
    taskTextColor:        g100.textOnColor,
    taskTextLightColor:   g100.textOnColor,
    taskTextDarkColor:    g100.textPrimary,
    activeTaskBorderColor: g100.interactive,
    activeTaskBkgColor:   colors.blue50,
    gridColor:            g100.borderSubtle00,
    doneTaskBkgColor:     g100.borderSubtle00,
    doneTaskBorderColor:  g100.borderStrong01,
    critBorderColor:      g100.supportError,
    critBkgColor:         g100.supportError,
    todayLineColor:       g100.supportWarning,

    errorBkgColor:        g100.supportError,
    errorTextColor:       g100.textOnColor,

    ...cScaleEntries(CSCALE_DARK),
  },
};

module.exports = { light, dark };
