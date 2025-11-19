<script setup lang="ts">
import { useWebSocket } from "@vueuse/core"
import { LineChart } from "@/components/ui/chart-line"

definePageMeta({
  layout: 'admin'
})

const loading = ref(false);
const chartCategories: ("Платежи, руб" | "date")[] = ["Платежи, руб"];

const { data: dashboardData, refresh } = await useFetch("/api/admin/dashboard/dashboard-data", {
  onResponse() {
    loading.value = false
  },
})

const wsUrl = "ws://localhost:3000/api/admin/dashboard/_ws"
const { data: wsData, status, open, close } = useWebSocket(wsUrl, {
  autoReconnect: true,
})

watch(wsData, (newValue) => {
  if (!newValue) return

  try {
    loading.value = true
    setTimeout(() => {
      const parsed = JSON.parse(newValue)
      dashboardData.value = parsed
      loading.value = false
    }, 1000)
  } catch (err) {
    console.error("Ошибка при парсинге WS данных:", err)
  }
})

const chartData = computed(() => {
  const payments = dashboardData.value?.paymentsByDate ?? []
  return payments.map((item) => ({
    date: new Date(item.createdAt).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
    }),
    ["Платежи, руб"]: Number(item._sum.amount),
  }))
})

</script>

<template>
  <div class="text-xl sm:text-2xl font-bold underline mb-5">Обзор продаж</div>
  <div class="max-w-4xl mx-auto">
    <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <Card class="bg-neutral-50 text-card-foreground">
        <CardHeader>
          <CardTitle>Общая прибыль, руб</CardTitle>
        </CardHeader>
        <CardContent class="flex items-center justify-center py-1 sm:py-4">
          <ShowcaseProductsLoadingIcon
            v-if="loading"
            stroke="4"
            size="28"
          />
          <p v-else class="text-2xl font-medium">
            {{ dashboardData?.totalEarnAmount?._sum?.amount ?? '—' }}
          </p>
        </CardContent>
      </Card>

      <Card class="bg-neutral-50 text-card-foreground">
        <CardHeader>
          <CardTitle>Количество регистраций</CardTitle>
        </CardHeader>
        <CardContent class="flex items-center justify-center py-1 sm:py-4">
          <ShowcaseProductsLoadingIcon
            v-if="loading"
            stroke="4"
            size="28"
          />
          <p v-else class="text-2xl font-medium">
            {{dashboardData?.countCustomer ?? '—' }}
          </p>
        </CardContent>
      </Card>

      <Card class="bg-neutral-50 text-card-foreground">
        <CardHeader>
          <CardTitle>Заказы</CardTitle>
        </CardHeader>
        <CardContent class="flex items-center justify-center py-1 sm:py-4">
          <ShowcaseProductsLoadingIcon
            v-if="loading"
            stroke="4"
            size="28"
          />
          <p v-else class="text-2xl font-medium">
            {{dashboardData?.countPayment ?? '—' }}
          </p>
        </CardContent>
      </Card>
    </div>

    <div class="rounded-lg border bg-neutral-50 text-card-foreground shadow-sm p-2 sm:p-6 mt-4">
      <h3 class="font-semibold leading-none tracking-tight">
        Статистика поступлений
      </h3>
      <div class="w-[99%] flex items-center justify-center">
        <ShowcaseProductsLoadingIcon
          v-if="loading"
          key="loading"
          stroke="4"
          size="30"
          class="mt-4"
        />
        <LineChart
          v-else
          key="chart"
          :data="chartData"
          index="date"
          :categories="chartCategories"
          :show-tooltip="true" 
          :y-formatter="(tick) =>
            typeof tick === 'number'
              ? `${new Intl.NumberFormat('ru-RU').format(tick)} ₽`
              : ''
          "
        />
      </div>
    </div>
  </div>
</template>
