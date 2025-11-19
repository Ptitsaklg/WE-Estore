
import prisma from '#utils/prisma'
import { USER_ROLE } from "../../auth/modules/user.constant";

export default defineEventHandler(async (event) => {
  const [paymentsByDate, countPayment, totalEarnAmount, countCustomer] = await fetchDashBoardData();
  return { paymentsByDate, countPayment, totalEarnAmount, countCustomer };
})

export async function fetchDashBoardData() {
  const data = await Promise.all([
    prisma.payment.groupBy({
      by: ['createdAt'],
      _sum: {
        amount: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    }),

    prisma.payment.count(),

    prisma.payment.aggregate({
      _sum: {
        amount: true
      }
    }),

    prisma.user.count({
      where: {
        role: USER_ROLE.CUSTOMER
      }
    })
  ])

  return data
}