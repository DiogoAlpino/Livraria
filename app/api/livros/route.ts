import { PrismaClient } from "@prisma/client"
import { NextRequest } from "next/server";

async function GET(req: NextRequest) {
  const prisma = new PrismaClient()

  const response = await prisma.livro.findMany();
  // console.log(response);

  return new Response(JSON.stringify({ livros: response, }),
    { status: 200, headers: { 'content-type': 'application/json', }, },);
}

const POST = async (req: Request) => {
  const prisma = new PrismaClient()  

  const res = await req.json();
  
  // console.log(res);

  const { nome, lancamento, descricao, categoria } = res
  
  const response = await prisma.livro.create({ data: { nome, lancamento: new Date(lancamento), descricao, categoria }});

  return new Response(JSON.stringify({ livros: response, }),
    { status: 201, headers: { 'content-type': 'application/json', }, },);
}

export { GET, POST }