const routes = [
	{
		path: '/',
		component: () => import('layouts/LayoutMain.vue'),
		children: [{ path: '', component: () => import('pages/Slider.vue') }]
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '*',
		component: () => import('pages/Error404.vue')
	}
]

export default routes
