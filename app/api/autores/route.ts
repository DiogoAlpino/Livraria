import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const GET = async(req: Request) => {
  const prisma = new PrismaClient()

  const response = await prisma.autor.findMany();
  // console.log(response);

  return new Response(JSON.stringify({ autores: response, }),
    { status: 200, headers: { 'content-type': 'application/json', }, },);
}

const POST = async (req: Request) => {
  const prisma = new PrismaClient()  

  const res = await req.json()  
  // console.log(res);

  const { nome, dataNascimento, biografia } = res
  
  const response = await prisma.autor.create({ data: { nome, dataNascimento: new Date(dataNascimento), biografia }});

  return new Response(JSON.stringify({ autores: response, }),
    { status: 201, headers: { 'content-type': 'application/json', }, },);
}



export { GET, POST }