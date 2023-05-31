-- CreateTable
CREATE TABLE "Autor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "biografia" TEXT,

    CONSTRAINT "Autor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Livro" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "lancamento" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,

    CONSTRAINT "Livro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AutorToLivro" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AutorToLivro_AB_unique" ON "_AutorToLivro"("A", "B");

-- CreateIndex
CREATE INDEX "_AutorToLivro_B_index" ON "_AutorToLivro"("B");

-- AddForeignKey
ALTER TABLE "_AutorToLivro" ADD CONSTRAINT "_AutorToLivro_A_fkey" FOREIGN KEY ("A") REFERENCES "Autor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AutorToLivro" ADD CONSTRAINT "_AutorToLivro_B_fkey" FOREIGN KEY ("B") REFERENCES "Livro"("id") ON DELETE CASCADE ON UPDATE CASCADE;
