<template>
	<div>
		<app-chart :data="chartData" :options="options" :width="500" :height="500"></app-chart>
	</div>
</template>

<script>
	import Chart from "./Chart/Chart";
	export default {
		components: {
			"app-chart": Chart
		},
		data() {
			return {
				bookingBucket: {
					Cheap: { min: 0, max: 100 },
					Normal: { min: 100, max: 400 },
					Expensive: { min: 400, max: 10000 }
				},
				outputBucket: {},
				val: []
			};
		},
		props: ["bookings"],
		computed: {
			labels() {
				return Object.keys(this.bookingBucket);
			},
			chartData() {
				return {
					labels: [...this.labels],
					datasets: [
						{
							label: "Event Expenditure Chart",
							barPercentage: 0.5,
							barThickness: 12,
							maxBarThickness: 12,
							minBarLength: 2,
							backgroundColor: "#007bff",
							hoverBackgroundColor: "#438edd",
							data: [...this.val, 0]
						}
					]
				};
			},
			options() {
				return {
					responsive: true,
					maintainAspectRatio: false
				};
			}
		},
		created() {
			for (const bucket in this.bookingBucket) {
				const bucketCount = this.bookings.reduce((prev, cur) => {
					if (
						cur.event.price > this.bookingBucket[bucket].min &&
						cur.event.price <= this.bookingBucket[bucket].max
					) {
						return prev + 1;
					} else {
						return prev;
					}
				}, 0);

				this.outputBucket[bucket] = bucketCount;
			}
			for (const val in this.outputBucket) {
				this.val.push(this.outputBucket[val]);
			}
		}
	};
</script>