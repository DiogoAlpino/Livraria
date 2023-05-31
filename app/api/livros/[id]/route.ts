import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import React, { useEffect, useState } from 'react';


const DELETE = async (req: Request, { params }: { params: { id: String } }) => {
  const prisma = new PrismaClient();

  const response = await prisma.livro.delete({where: { id: Number(params.id) }});
  // console.log(response);
  

  return new Response(
    JSON.stringify({ message: 'Livro excluído com sucesso' }),
    { status: 200, headers: { 'content-type': 'application/json' } }
  );
}

const PUT = async (req: Request, { params }: { params: { id: String } }) => {
  const prisma = new PrismaClient();
  const res = await req.json()
  // console.log("res", res);

  const response = await prisma.livro.update({ where:
    { id: Number(params.id) }, data: { ...res, lancamento: new Date(res.lancamento) } });
  console.log(response);
  

  return NextResponse.json({ message: "Livro editado" });

}

const GET = async (req: Request, { params }: { params: { id: String } }) => {
  const prisma = new PrismaClient();
  // console.log("params", params);  

  const response = await prisma.livro.findUnique({ where: { id: Number(params.id) } });
  // console.log("response BACK", response);

  return NextResponse.json(response);
   
}

export { DELETE, GET, PUT }