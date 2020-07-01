<template>
	<view>
		<myp-navbar :fixed="false" title="发现"></myp-navbar>
		<myp-list-simple bgType="page" :includeXBar="false">
			<myp-list-cell>
				<view v-for="(cats,i) in selections" :key="i" style="flex-direction: row;">
					<text>{{cats.name}}</text>
					<view v-if="cats.hasLabel">
						<view v-for="(cat,j) in cats.children" :key="j" style="flex-direction: row;">
							<text>{{cat.label}}</text>
							<view v-for="(tag,k) in cat.children" :key="k" style="flex-direction: row;">
								<text>{{tag.name}}</text>
							</view>
						</view>
					</view>
					<view v-else>
						<view style="flex-direction: row;">
							<text v-for="(cat,j) in cats.children" :key="j">{{cat.name}}</text>
						</view>
					</view>
				</view>
			</myp-list-cell>
		</myp-list-simple>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				filters: [{
					"id": "11",
					"name": "A类型",
					"children": [{
							"id": "12",
							"name": "A1",
							"labelType": "标签1"
						},
						{
							"id": "16",
							"name": "A2",
							"labelType": "标签1"
						},
						{
							"id": "18",
							"name": "A3",
							"labelType": "标签2"
						}
					]
				}, {
					"id": "22",
					"name": "B类型",
					"children": [{
						"id": "23",
						"name": "B1"
					}, {
						"id": "24",
						"name": "B2"
					}]
				}]
			}
		},
		computed: {
			selections() {
				return this.toGenerateSelections(this.filters)
			}
		},
		methods: {
			toGenerateSelections(val) {
				const arr = []
				for (const i in val) {
					const theI = val[i]
					const children = theI['children'] || []
					if (children.length > 0) {
						if (typeof children[0]['labelType'] === 'string') {
							// 需要处理
							const a = {
								id: theI.id,
								name: theI.name,
								hasLabel: true
							}
							const labels = []
							for (const j in children) {
								const theC = children[j]
								// 不是第一个
								if (a.children) {
									let flag = false
									// 判断属于哪个label，然后加进去
									for (const k in labels) {
										const theLabel = labels[k]
										// 属于同一个label，加进去
										if (theLabel === theC.labelType) {
											flag = true
											a.children[k]['children'].push({id: theC.id, name: theC.name})
											break
										}
									}
									// 标签不存在，加进去
									if (!flag) {
										labels.push(theC.labelType)
										a.children.push({label: theC.labelType, children: [{id: theC.id, name: theC.name}]})
									}
								} else {
									// 第一个
									labels.push(theC.labelType)
									a['children'] = [{label: theC.labelType, children: [{id: theC.id, name: theC.name}]}]
								}
							}
							arr.push(a)
						} else {
							// 不需要处理
							arr.push(JSON.parse(JSON.stringify(theI)))
						}
					}
				}
				console.log(arr)
				return arr
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '@/mypUI/mypui.scss';
</style>
