const public_metrics = () => {
	return {
		retweet_count: Math.floor(Math.random() * 51),
		reply_count: Math.floor(Math.random() * 21),
		like_count: Math.floor(Math.random() * 151),
		quote_count: Math.floor(Math.random() * 11),
	}
}

export const response = {
	data: [
		{
			author_id: '1177562280063643649',
			text: 'как же мощно Венгрия охуела',
			public_metrics: { ...public_metrics() },
			id: '1551605943279943680',
		},
		{
			author_id: '1134493932',
			text: 'как же мощно я щас сожрала пачку чипсов от нервяка',
			public_metrics: { ...public_metrics() },
			id: '1551604544576045059',
		},
		{
			author_id: '1310655496874086411',
			text: 'как же мощно я ебанулась https://t.co/fJayypeUHb',
			public_metrics: { ...public_metrics() },
			id: '1551599565123555328',
		},
		{
			author_id: '338294437',
			text:
				'как же мощно я охуею в сентябре, когда поведу ариану в сад🙂 \n' +
				'я прям отвечаю она адский ребёнок',
			public_metrics: { ...public_metrics() },
			id: '1551576545965350913',
		},
		{
			author_id: '4768415477',
			text: 'как же мощно я отбил себе руку когда со всей силы пиздил пол кулаком на эпилоге стаи 1993 вчера',
			public_metrics: { ...public_metrics() },
			id: '1551569915743698945',
		},
		{
			author_id: '807292382',
			text: 'как же мощно я тогда набухалась до блэкаута во время которого веселила весь бар а особенно анечку максимовочку и аню жу',
			public_metrics: { ...public_metrics() },
			id: '1551566555057618945',
		},
		{
			author_id: '1084445762661072897',
			text: 'как же мощно мы устраиваем с подругой языковую кашу когда начинаем говорить на русском, продовжуэмо українською, and I finish in English',
			public_metrics: { ...public_metrics() },
			id: '1551536081685733376',
		},
		{
			author_id: '1451333513865801728',
			text: 'зарплата + зарплата + стипендия спасибо тебе наташа из июня как же мы мощно поработали на двух работах и закрыли сессию чтобы ты в июле потратила это все за две недели',
			public_metrics: { ...public_metrics() },
			id: '1551533017650307075',
		},
		{
			author_id: '1439294659130503170',
			text: 'Как же мощно я сегодня пойду в книжный за какой то имбовой книгой',
			public_metrics: { ...public_metrics() },
			id: '1551531449714724866',
		},
		{
			author_id: '1499818776602333190',
			text: 'Как же мощно у меня вспотела Жопа ставлю минус этой ситуации и погоде',
			public_metrics: { ...public_metrics() },
			id: '1551527376433152000',
		},
	],
}
