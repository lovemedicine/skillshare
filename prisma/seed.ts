import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const username = 'nettlepockets'

async function main() {
  const note1 = await prisma.userSkill.create({
    data: {
      username,
      type: 'TEACH',
      skill: {
        create: {
          name: 'programming'
        }
      }
    }
  })
  const note2 = await prisma.userSkill.create({
    data: {
      username,
      type: 'TEACH',
      skill: {
        create: {
          name: 'knitting'
        }
      }
    }  })
  const note3 = await prisma.userSkill.create({
    data: {
      username,
      type: 'TEACH',
      skill: {
        create: {
          name: 'mead making'
        }
      }
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })