export const gradientThemes = [
	'cristal',
	'teen',
	'mind',
	'morning',
	'vice',
	'passion',
	'fruit',
	'instagram',
	'atlas',
	'retro',
	'summer',
	'rainbow',
	'pastel',
] as const;

export type GradientTheme = (typeof gradientThemes)[number];

export const cycleGradient = (currentTheme: GradientTheme): GradientTheme => {
	const currentIndex = gradientThemes.indexOf(currentTheme);
	return gradientThemes[
		(currentIndex + 1) % gradientThemes.length
	] as GradientTheme;
};

export const cyclePreviousGradient = (
	currentTheme: GradientTheme,
): GradientTheme => {
	const currentIndex = gradientThemes.indexOf(currentTheme);
	return gradientThemes[
		currentIndex === 0 ? gradientThemes.length - 1 : currentIndex - 1
	] as GradientTheme;
};
