'use client';

import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  ArrowLeft,
  Upload,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';
import Link from 'next/link';

interface Employee {
  id: string;
  nome: string;
  setor: string;
  status: 'pendente' | 'entregue';
  kits: number;
  kitNatalino: number;
  dataEntrega?: string;
  retiradoPor?: string;
}

export default function ImportPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importResult, setImportResult] = useState<{
    success: boolean;
    count: number;
    message: string;
  } | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImportResult(null);
    }
  };

  const processImport = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);

    // Simular processamento do arquivo
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      // Aqui seria implementada a lógica real de leitura do Excel
      // Por enquanto, vamos simular dados importados

      const simulatedData = [
        {
          id: '11861',
          nome: 'Flavio Roberto da Silva Rodrigues',
          setor: 'Vendedor IV',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '89595',
          nome: 'Cristiano Gomes de Melo',
          setor: 'Auditor de Execucao',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '156672',
          nome: 'Marcia Sebastiana Azevedo Cunha',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '158474',
          nome: 'Rosivaldo Da Silva Mata',
          setor: 'Vendedor II',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '162149',
          nome: 'Robson Radames Garcia Grymuza',
          setor: 'Gerente Vendas II',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '170297',
          nome: 'Simone Cristina Martins Barros De Souza',
          setor: 'Analista de RH BP SR',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '171092',
          nome: 'Severino Lima Da Silva',
          setor: 'Vendedor II',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '185520',
          nome: 'Ronaldo Ferreira Do Carmo',
          setor: 'Vendedor II',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '201465',
          nome: 'Rafaella Monique De Lima Araujo',
          setor: 'Supervisor de Vendas',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '210465',
          nome: 'Paulo Sergio da Conceicao',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '229640',
          nome: 'Abmaria Joaquina da Costa',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '231286',
          nome: 'Josafa Severino da Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '244229',
          nome: 'Pollyana Rafaella Paulino',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '250701',
          nome: 'Edivaldo Luiz de Lima',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '260998',
          nome: 'Alisson Cidrino da Silva',
          setor: 'Vendedor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '302435',
          nome: 'Sandro Jose Assis de Oliveira',
          setor: 'Vendedor III',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '302541',
          nome: 'Tercio Duarte Rodrigues Costa',
          setor: 'Gerente Regional Trade Marketing I',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '302728',
          nome: 'Edmilson Alves dos Santos',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '303035',
          nome: 'Vagner Francisco da Silva',
          setor: 'Gerente Exec Regional de Vendas II',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '317891',
          nome: 'Eduardo Acioli de Lima',
          setor: 'Supervisor de Contas',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '318079',
          nome: 'Willamys Francisco da Silva',
          setor: 'Vendedor III',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '318253',
          nome: 'Sergio Fernando de Sena',
          setor: 'Vendedor II',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '319508',
          nome: 'Gildo Tomaz da Silva Filho',
          setor: 'Gerente Vendas II',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '320570',
          nome: 'Audilane Lima Braga',
          setor: 'Coordenador Trade Marketing',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '320572',
          nome: 'Gilvania Cabral de Melo',
          setor: 'Gerente Processos Pricing e Financ II',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '325348',
          nome: 'Simone Roberta Silva do Nascimento',
          setor: 'Vendedor II',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '325360',
          nome: 'Italo Oliveira Agrelle Junior',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '325947',
          nome: 'Jose Marcos da Silva',
          setor: 'Vendedor II',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '327558',
          nome: 'Cledivan Cordeiro dos Santos',
          setor: 'Analista Trade Mkt SR',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '328305',
          nome: 'Jefferson Francisco Diniz da Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '332036',
          nome: 'Juliane Alves Pinheiro',
          setor: 'Analista Customer Service SR',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '343578',
          nome: 'Lucia Helena da Silva Santos Nicodemos',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '343914',
          nome: 'Jose Oliveira Da Silva Filho',
          setor: 'Vendedor II',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '348204',
          nome: 'Sergio Silva Albuquerque',
          setor: 'Vendedor II',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '352329',
          nome: 'Augusto Manoel Torres de Santana',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '400372',
          nome: 'Thiego Camargo',
          setor: 'Gerente',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '408369',
          nome: 'Orlando Vasconcelos Viana Neto',
          setor: 'Analista Customer Service PL',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '411951',
          nome: 'Liliane Felinto de Macedo',
          setor: 'Vendedor III',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '430147',
          nome: 'Davisson Mendes De Almeida',
          setor: 'Vendedor II',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '430515',
          nome: 'Janaina Alves Guedes',
          setor: 'Supervisor de Vendas',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '437973',
          nome: 'Rosana Maria da Costa',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '442981',
          nome: 'Maicon Mata',
          setor: 'DIRETOR',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '447973',
          nome: 'Heron Felinto Wolkoff',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '448063',
          nome: 'Gueize Almeida Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '449351',
          nome: 'Tiago da Silva Lima',
          setor: 'Vendedor Interno I',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '463276',
          nome: 'Italo Emidio de Santana',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '463283',
          nome: 'Jeane Maria de Santana',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '464036',
          nome: 'Terezinha Elen Amancio De Araujo',
          setor: 'Vendedor I',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '466600',
          nome: 'Claudinaldo Jose Da Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '470349',
          nome: 'Robson Andre de Souza',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '470936',
          nome: 'Guilherme Henrique Buarque Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '473710',
          nome: 'Thiago Damasceno Da Silva Lima',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '474340',
          nome: 'Rubenilton Jose Da Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '483711',
          nome: 'Marcelo Da Silva Ayres',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '484552',
          nome: 'Edson Jeronimo da Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '488529',
          nome: 'Josenita Araujo de Lima',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '489382',
          nome: 'Cristiano Valerio Dos Santos',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '493525',
          nome: 'Samuel Virginio da Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '500817',
          nome: 'Edson Cosmo De Lima',
          setor: 'Vendedor I',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '506314',
          nome: 'Robson Joao Pereira',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '506316',
          nome: 'Natalia de Barros Lima',
          setor: 'Promotor Blitz',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '506420',
          nome: 'Italo Tavares Cavalcante de Lira',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '510441',
          nome: 'Flavia Andrade De Brito',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '510466',
          nome: 'Dvison Barros Pereira',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '522839',
          nome: 'Sonia Maria Pia Coelho',
          setor: 'Vendedor III',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '524558',
          nome: 'Jose Wilkly Jeronimo',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '535258',
          nome: 'Marcos Antonio Guedes de Souza Junior',
          setor: 'Supervisor de Vendas',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '537285',
          nome: 'Maria Eugenia das Merces Mota',
          setor: 'Supervisor de Vendas',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '537469',
          nome: 'Cristiano Rodrigues de Lima',
          setor: 'Analista Operacoes Logistica PL',
          status: 'pendente',
          kits: 2,
          kitNatalino: 0,
        },
        {
          id: '544295',
          nome: 'Marcio Wagner Da Paz Sobral',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '547345',
          nome: 'Marcelo Serrao Moreira',
          setor: 'Especialista Processos Vendas',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '551260',
          nome: 'Carlos Fernando Amorelli Viallet Silva',
          setor: 'Coordenador Nucleo Apoio Gestao e Finan',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '553433',
          nome: 'Maria Suely Da Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '555997',
          nome: 'Romildo Tavares da Silva Junior',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '558734',
          nome: 'Carlos Eduardo Panseri',
          setor: 'Gerente Distribuição',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '562766',
          nome: 'Joao Manoel Rodrigues De Andrade',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '571794',
          nome: 'Maria Luiza de Almeida',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '571802',
          nome: 'Edjane Goncalves Dos Santos',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '572776',
          nome: 'Adelson Jose da Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '573630',
          nome: 'Adriana Da Silva Lima',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '575544',
          nome: 'Thatiane Leme de Araujo',
          setor: 'Coordernadora RH',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '576158',
          nome: 'Hugo Leonardo Araujo Cavalcanti',
          setor: 'Vendedor I',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '579134',
          nome: 'Gilberto Monteiro do Nascimento',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '583233',
          nome: 'Carlos Ramon Freire Pena',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '588566',
          nome: 'Aldira Ramos Gode',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '588613',
          nome: 'Ana Paula Da Silva Aguiar',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '589025',
          nome: 'Weiverson Bezerra Da Silva',
          setor: 'Advogado Trabalhista PL',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '591002',
          nome: 'Ivo Abbad Leite',
          setor: 'Supervisor de Vendas',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '594161',
          nome: 'Liliana Rocha',
          setor: 'Analista Comercial JR',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '594529',
          nome: 'Eneias Lira Vieira',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '594531',
          nome: 'Erika Tavares Ferreira',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '594534',
          nome: 'Erivan Nascimento Da Silva Lima',
          setor: 'Vendedor I',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '594546',
          nome: 'Raquel Alves De Oliveira',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '594547',
          nome: 'Joao Pedro Ozelito Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '594815',
          nome: 'Gabriel Tavares De Souza Campelo',
          setor: 'Coordenador Vendas',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '595967',
          nome: 'Alexandro Da Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '600031',
          nome: 'Kaynara Pereira Apolinario',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '600052',
          nome: 'Mariana Cavalcanti Dias Palmeira',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '601565',
          nome: 'Flavia Andreza De Lima',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '601570',
          nome: 'Andre Vicente Macedo Correia',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '601578',
          nome: 'Vandui Jose Do Nascimento',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '601845',
          nome: 'Ruan Felipe Pereira Cunha',
          setor: 'Analista Customer Service Corporativo SR',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '602862',
          nome: 'Joelma Maria Da Cruz Cavalcante',
          setor: 'Vendedor Interno I',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '606103',
          nome: 'Daniel Mendes Da Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '608919',
          nome: 'Luiz Carlos Maranhao Batista De Souza',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '612190',
          nome: 'Adelson Muniz',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '612843',
          nome: 'Andrea Ferreira Martins',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '616849',
          nome: 'Josuel Cavalcanti De Oliveira',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '616864',
          nome: 'Carine Pamela De Araujo',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '616887',
          nome: 'Luiz Henrique Rangel Costa',
          setor: 'Supervisor Vendas Internas',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '623064',
          nome: 'Mirella Nogueira Batista Wanderley',
          setor: 'Vendedor II',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '624167',
          nome: 'Emerson Fernandes Da Silva Alves',
          setor: 'Analista Comercial SR',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '628062',
          nome: 'Henrique Lemos De Oliveira',
          setor: 'Analista Operacoes Logistica PL',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '631784',
          nome: 'Monique Arlete Lucia Da Silva',
          setor: 'Analista Customer Service JR',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '631787',
          nome: 'Robson Jose Da Silva Neves',
          setor: 'Vendedor I',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '635688',
          nome: 'Camila Cristina Alves Freitas De Holanda',
          setor: 'Analista Operacoes Logistica PL',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '652933',
          nome: 'Jhonathan Lucas Baracho Sarino',
          setor: 'Vendedor II',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '652950',
          nome: 'Denis Muniz da Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '655361',
          nome: 'Gustavo Augusto Ribeiro Da Silva',
          setor: 'Vendedor II',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '657163',
          nome: 'Tahnee Milfont Fong',
          setor: 'Especialista Key Account',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '659038',
          nome: 'Franklin Rodrigues do Nascimento',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '663863',
          nome: 'Jessica Rafaele Gomes da Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '666714',
          nome: 'Kaenedi Couto Araujo',
          setor: 'Vendedor I',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '679615',
          nome: 'Adrino Francisco dos Santos Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '683669',
          nome: 'Bruno Thiago Pereira Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '687195',
          nome: 'Evellyn Mirelle da Silva',
          setor: 'Analista Comercial JR',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '694215',
          nome: 'Daniel Silva de Santana',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '694552',
          nome: 'Marcelo Augusto Ferreira da Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '696017',
          nome: 'Roberta Cristina Dias Lima',
          setor: 'Vendedor II',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '701054',
          nome: 'Jose Alexandre De Melo Soares',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '701179',
          nome: 'Elaine De Cassia Barros Barbosa Ferreira',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '703106',
          nome: 'Josue De lima Vera cruz',
          setor: 'Vendedor Interno I',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '704481',
          nome: 'Valdecio de Santana Barbosa',
          setor: 'Vendedor II',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '705231',
          nome: 'Leonardo Jose De Santana',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '707364',
          nome: 'Mauricio Cicero De Oliveira Junior',
          setor: 'Vendedor Interno I',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '708084',
          nome: 'Wellington Farias De lima',
          setor: 'Vendedor Interno I',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '710442',
          nome: 'Gilvaneide Amalia da silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '710587',
          nome: 'Jessica Maria Gomes Macedo',
          setor: 'Analista Comercial JR',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '717470',
          nome: 'Janaina Cinthya Ferreira do Nascimento',
          setor: 'Analista Comercial Qualidade JR',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '718894',
          nome: 'Ivanise Alves Branes',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '721852',
          nome: 'Pedro Paulo Costa Do Nascimento',
          setor: 'Supervisor de Vendas',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '722451',
          nome: 'Kaynara Oliveira Pontes Da Silva',
          setor: 'Analista Comercial PL',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '730421',
          nome: 'Michele Vasconcelos Da Silva',
          setor: 'Vendedor I',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '730606',
          nome: 'Thayna Dias Da Silva',
          setor: 'Analista Comercial JR',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '735327',
          nome: 'Larissa Correia Trindade',
          setor: 'Vendedor Interno I',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '736948',
          nome: 'Eduardo Jorge Ventura Maia',
          setor: 'Vendedor I',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '737470',
          nome: 'Altemir Jose Pereira Do Nascimento',
          setor: 'Vendedor I',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '742942',
          nome: 'Fabio Eduardo Leite de Melo',
          setor: 'Analista Customer Service JR',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '743348',
          nome: 'Daniel Felipe Pereira Da Mota',
          setor: 'Vendedor I',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '744062',
          nome: 'Thiago Mota Ribeiro',
          setor: 'Supervisor de Trade Marketing',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '749058',
          nome: 'Luiz Antonio Lourenco Da Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '750007',
          nome: 'Pedro Henrique  Costa Campos',
          setor: 'Assistente Comercial',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '750946',
          nome: 'Maria Eduarda Silva Pereira De Araujo',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '750951',
          nome: 'Dayanna Ingryd Marinho Couto Brito',
          setor: 'Analista Comercial SR',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '753421',
          nome: 'Jose Lua Amorim Da Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '755336',
          nome: 'Lucas Machado Santos',
          setor: 'Assistente Pricing',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '756718',
          nome: 'Pedro Victor Luiz Coelho De Miranda',
          setor: 'Vendedor I',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '758971',
          nome: 'Caio Vinicius Galindo De Almeida',
          setor: 'Analista de RH BP JR',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '759081',
          nome: 'Joao Guilherme De Sousa Gomes',
          setor: 'Nova Admissão',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '759411',
          nome: 'Carlos Vinicius Silva De Souza',
          setor: 'Especialista Comercial',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '763488',
          nome: 'Mariana Vitória do Prado Barbosa',
          setor: 'Auxiliar Administrativo',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '763930',
          nome: 'Diogo José Soares',
          setor: 'Supervisor de Contas',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '766880',
          nome: 'Alexsandro Santos Araujo Junior',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '766881',
          nome: 'Nelbe Paes',
          setor: 'Coordenador Financeiro',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '779510',
          nome: 'Davi Pinheiro',
          setor: 'Supervisor de Contas',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '781950',
          nome: 'Lucas Melo',
          setor: 'Tecnico Segurança',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '783595',
          nome: 'Tiago José',
          setor: 'Nova Admissão',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '786390',
          nome: 'Alysson Samuel Andrade De Lima',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '787601',
          nome: 'Iris Ketli Pereira Barbosa',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '788137',
          nome: 'Leandro Pereira Da Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '788145',
          nome: 'Allejandro Lima Dos Santos',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '791528',
          nome: 'Renato Quirino Da Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '791531',
          nome: 'Ivison Josivan Gomes Da Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '791555',
          nome: 'Brindizio Mota Da Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '792280',
          nome: 'Marcos Gomes De Araujo',
          setor: 'Analista Pricing SR',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '792575',
          nome: 'Whilamis Michel Dos Santos Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '794707',
          nome: 'Maria Isabela Lins Da Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '794765',
          nome: 'Laudemir Neri Pereira',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '794785',
          nome: 'Leandro Batista Maranhão',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '794890',
          nome: 'Williams Manuel Dos Santos',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '794901',
          nome: 'Ricardo Vitor Cruz Dos Santos',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '794904',
          nome: 'Alex Araujo da Mata Cunha',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '795124',
          nome: 'Andre Bezerra Da Silva Filho',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '795600',
          nome: 'Carlos Augusto de Almeida Cardoso',
          setor: 'Assistente Comercial',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '801107',
          nome: 'Diego Moacir Leite',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '801108',
          nome: 'Guilherme Aurelio Moura Da Costa',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '801237',
          nome: 'Raysma Etiene',
          setor: 'Assistente Comercial',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '801387',
          nome: 'Pedro Henrique Diniz Ramos',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '801946',
          nome: 'Thays Cristina Salvino e Barros',
          setor: 'Analista de Talent BRF',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '803180',
          nome: 'Gabriel Vinicius dos Santos Medeiros',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '803258',
          nome: 'Trielly Julia Paes Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '809310',
          nome: 'Anderson Jose Macedo De Freitas',
          setor: 'Nova Admissão',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '809432',
          nome: 'Talitta Joyce Da Silva Fialho',
          setor: 'Nova Admissão',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '811828',
          nome: 'Cauã Emerson de Paiva Correia',
          setor: 'Nova Admissão',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '813130',
          nome: 'Romildo Correia Da Silva Junior',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '815051',
          nome: 'Wesley Godê Patricio Silva',
          setor: 'Aprendiz Repositor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '815075',
          nome: 'Caio César Dutra da Silva',
          setor: 'Aprendiz Repositor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '815828',
          nome: 'Monalisa Kelly Cavalcante',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '816027',
          nome: 'Rosirene Mercia De Araujo Sales',
          setor: 'Vendedor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '818526',
          nome: 'Geysiane Da Silva Ramos',
          setor: 'Nova Admissão',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '819320',
          nome: 'Márlon Gabriel Amâncio de Souza',
          setor: 'Aprendiz',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '819420',
          nome: 'Hermes Luiz silva cordeiro filho',
          setor: 'Aprendiz',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '820329',
          nome: 'Pedro Augusto Farias De Sa Marques',
          setor: 'Analista Customer Service PL',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '821756',
          nome: 'Gustavo Luiz de Albuquerque Lemos',
          setor: 'Assistente Comercial',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '856259',
          nome: 'Maria Eduarda Gomes Do Rego Barros',
          setor: 'Aprendiz',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '825569',
          nome: 'Beatriz Gomes De Sousa',
          setor: 'Aprendiz Repositor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '826936',
          nome: 'Caua Vinicius Brito Da Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '827270',
          nome: 'David Jose Do Nascimento',
          setor: 'Nova Admissão',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '848647',
          nome: 'Gabriel Santiago Alves Pimentel',
          setor: 'Estagiário',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '828132',
          nome: 'Luiza Ohana Santos Silva',
          setor: 'Nova Admissão',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '830442',
          nome: 'Roberto Rosemberg de Oliveira Paulino',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '830444',
          nome: 'Gleydson Alexsander Dantas De Castro',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '830929',
          nome: 'Ezequias Esdras de Souza',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '830930',
          nome: 'Lucas Mikael de Lima Rodrigues',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '830932',
          nome: 'Adrya Lavinia Araujo Melo',
          setor: 'Auxiliar trade mkt',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '830934',
          nome: 'Joao Victor Ferreira Barros',
          setor: 'Assistente Comercial',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '831125',
          nome: 'Geisirlane Leila Marcelino da Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '831728',
          nome: 'Carlos Alberto de Oliveira Neto',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '832488',
          nome: 'Danilo Henrique Araujo de Sena',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '833704',
          nome: 'Nayalia Victoria Luna Barbosa',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '835011',
          nome: 'Luis Henrique Silva De Souza',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '835012',
          nome: 'Tomaz Rodrigues Do Nascimento',
          setor: 'Aprendiz Administrativo',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '835150',
          nome: 'Stefane Cordeiro da Silva Lima',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '835656',
          nome: 'Willima Pinheiro',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '835794',
          nome: 'Bianca Barbosa De Souza',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '860341',
          nome: 'Rafaela Da Conceicao',
          setor: 'Aprendiz Administrativo',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '838116',
          nome: 'Hanna Gabriela Marques Carlos',
          setor: 'Aprendiz Administrativo',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '838946',
          nome: 'Flavio Bionde Da Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '839648',
          nome: 'Debora Cristina Bernardo Gomes',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '839649',
          nome: 'Gabriel Costa Figueiredo',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '839818',
          nome: 'Romenique Wallace Marques Dos Santos',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '839899',
          nome: 'Henrique Borges Oliveira De Arruda Falcao',
          setor: 'Estagiario Nivel Superior',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '840040',
          nome: 'Leandro Jose Dos Santos Lima',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '840284',
          nome: 'Patricia Maria Da Silva Mendonca',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '840285',
          nome: 'Rony Kleber Albuquerque Pinheiro',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '840387',
          nome: 'Weslley Vitor Rodrigues Ferro',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '841304',
          nome: 'Tiago Alves Da Cunha',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '841307',
          nome: 'Grazielly Vitoria Luna Muniz',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '841494',
          nome: 'Danilo Alves Pinheiro',
          setor: 'Vendedor Interno I',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '842094',
          nome: 'Sarah Duarte Do Nascimento',
          setor: 'Aprendiz Administrativo',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '843091',
          nome: 'Anderson Da Silva Eduardo',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '845176',
          nome: 'Kauã Lucas',
          setor: 'Aprendiz repositor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '845177',
          nome: 'Gustavo da conceição cordeiro',
          setor: 'Aprendiz repositor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '845178',
          nome: 'Mila Nunes Ramos',
          setor: 'Analista Customer Service PL',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '845944',
          nome: 'Luana Tavares Da Silva',
          setor: 'Aprendiz Repositor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '846607',
          nome: 'Adriano Trajano',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '847811',
          nome: 'Marina Lima De Oliveira',
          setor: 'Analista Customer Service PL',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '848251',
          nome: 'Micaeli Vitoria Andrade Agostinho',
          setor: 'Estagiario Nivel Superior',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '848381',
          nome: 'Tiego Wellison Balbino Da Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '848448',
          nome: 'William Igor De Lima Silva',
          setor: 'Aprendiz Adm',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '848556',
          nome: 'Thiago Perez Gomes',
          setor: 'Analista Comercial JR',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '848574',
          nome: 'Guilherme Lopes Da Silva',
          setor: 'Aprendiz Repositor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '849706',
          nome: 'Marcelo Vinicius Pinheiro Vasconcelos Silva',
          setor: 'Analista Customer Service PL',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '850570',
          nome: 'Surama Rodrigues Serodio',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '851860',
          nome: 'Daniel Do Nascimento Santos',
          setor: 'Aprendiz Repositor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '851861',
          nome: 'Kaua Gabriel Belo de Brito',
          setor: 'Aprendiz Repositor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '852364',
          nome: 'Thalyta Kayllane Lima Da Silva',
          setor: 'Aprendiz Repositor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '852366',
          nome: 'Gustavo Vinicius Alves Aroucha',
          setor: 'Aprendiz Repositor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '852996',
          nome: 'David Cesar De Souza',
          setor: 'Vendedor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '853079',
          nome: 'Anderson Evangelista De Vasconcelos',
          setor: 'Vendedor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '853207',
          nome: 'Paulo Monteiro Junior',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '854455',
          nome: 'Deyvid Gabriel Ramos Maciel Oliveira',
          setor: 'Aprendiz Repositor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '855222',
          nome: 'Jhonnathas Da Silva Nascimento',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '855323',
          nome: 'Gabrielly Araujo Sales De Oliveira',
          setor: 'Vendedor Interno I',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '855743',
          nome: 'Caio Felipe Domingos Da Silva',
          setor: 'Assistente Comercial',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '855861',
          nome: 'Rosana Da Silva Alves',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '852723',
          nome: 'Thiago Santana Gomes Da Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '856183',
          nome: 'Jean Andrade Da Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: 'TERCEIRO-1',
          nome: 'Francisco Felix da Silva Neto',
          setor: 'Terceiro',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: 'TERCEIRO-2',
          nome: 'Hermildo Andrade',
          setor: 'Terceiro',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '858773',
          nome: 'Raquel Maria Amaro',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '859448',
          nome: 'Adonis Vinicius Guedes Da Silva',
          setor: 'Aprendiz Repositor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '859449',
          nome: 'Ana Beatriz Sales Lima Da Silva',
          setor: 'Aprendiz Repositor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '859544',
          nome: 'Daniel Jose De Assis Neto',
          setor: 'Aprendiz Repositor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '663616',
          nome: 'Aurea Beatriz Dantas Silva',
          setor: 'Supervisor de contas',
          status: 'pendente',
          kits: 1,
          kitNatalino: 1,
        },
        {
          id: '861647',
          nome: 'Ana Beatriz Winterscheidt de Oliveira',
          setor: 'Auxiliar trade mkt',
          status: 'pendente',
          kits: 1,
          kitNatalino: 0,
        },
        {
          id: '861617',
          nome: 'Luciene Ribeiro da Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 0,
        },
        {
          id: '861526',
          nome: 'LUCICLEIDE RAMOS DOS SANTOS',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 0,
        },
        {
          id: '861471',
          nome: 'Camila Caitano De Araujo',
          setor: 'Auxiliar comercial',
          status: 'pendente',
          kits: 1,
          kitNatalino: 0,
        },
        {
          id: '862042',
          nome: 'Romulo Jaguaribe Do Nascimento Pereira',
          setor: 'Analista Comercial SR',
          status: 'pendente',
          kits: 1,
          kitNatalino: 0,
        },
        {
          id: '862220',
          nome: 'Edilson Juveliano da Silva',
          setor: 'Promotor',
          status: 'pendente',
          kits: 1,
          kitNatalino: 0,
        },
        {
          id: '862406',
          nome: 'Alana Mirelly Viana Moura',
          setor: 'Aprendiz SST',
          status: 'pendente',
          kits: 1,
          kitNatalino: 0,
        },
        {
          id: '999999',
          nome: 'Znova Admissão',
          setor: 'Znova Admissão',
          status: 'pendente',
          kits: 3,
          kitNatalino: 0,
        },
      ];

      // Salvar no localStorage
      const existingData = localStorage.getItem('brf-employees');
      const currentEmployees: Employee[] = existingData
        ? JSON.parse(existingData)
        : [];

      // Adicionar novos funcionários (evitar duplicatas por ID)
      const newEmployees = simulatedData.filter(
        (newEmp) =>
          !currentEmployees.some((existing) => existing.id === newEmp.id)
      );

      const updatedEmployees = [...currentEmployees, ...newEmployees];
      localStorage.setItem('brf-employees', JSON.stringify(updatedEmployees));

      setImportResult({
        success: true,
        count: newEmployees.length,
        message: `${newEmployees.length} novos colaboradores importados com sucesso!`,
      });

      toast({
        title: 'Importação concluída',
        description: `${newEmployees.length} colaboradores importados com sucesso!`,
      });
    } catch (error) {
      setImportResult({
        success: false,
        count: 0,
        message: 'Erro ao processar o arquivo.',
      });

      toast({
        title: 'Erro na importação',
        description: 'Não foi possível processar o arquivo.',
        variant: 'destructive',
      });
    }

    setIsProcessing(false);
  };

  const clearData = () => {
    localStorage.removeItem('brf-employees');
    setSelectedFile(null);
    setImportResult(null);
    toast({
      title: 'Base limpa',
      description:
        'Todos os dados foram removidos. Você pode importar uma nova planilha.',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="p-1 sm:p-2">
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
              <Image
                src="/brf-logo.png"
                alt="BRF Logo"
                width={40}
                height={40}
                className="object-contain sm:w-[60px] sm:h-[60px]"
              />
              <div>
                <h1 className="text-sm sm:text-xl font-bold text-gray-900">
                  Importar Planilha
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                  Upload da lista de colaboradores
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Instructions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm sm:text-lg">
              <FileSpreadsheet className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
              Instruções para Importação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs sm:text-sm">
            <div className="bg-orange-50 p-3 sm:p-4 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2">
                Formato da Planilha Excel:
              </h4>
              <ul className="space-y-1 text-orange-700">
                <li>
                  • <strong>Coluna A:</strong> ID do funcionário
                </li>
                <li>
                  • <strong>Coluna B:</strong> Nome completo
                </li>
                <li>
                  • <strong>Coluna C:</strong> Setor/Departamento
                </li>
                <li>
                  • <strong>Primeira linha:</strong> Cabeçalhos (serão
                  ignorados)
                </li>
              </ul>
            </div>
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <p className="text-blue-800">
                <strong>Formatos aceitos:</strong> .xlsx, .xls
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Upload Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-sm sm:text-lg">
              Selecionar Arquivo
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Escolha o arquivo Excel com a lista de colaboradores
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center">
              <Upload className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />

              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <Button
                    type="button"
                    className="bg-orange-600 hover:bg-orange-700 text-xs sm:text-sm"
                  >
                    <Upload className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    Selecionar Arquivo
                  </Button>
                  <p className="text-xs sm:text-sm text-gray-600">
                    ou arraste o arquivo aqui
                  </p>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </div>

            {selectedFile && (
              <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
                <div className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-xs sm:text-sm truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-green-600">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Button
                onClick={processImport}
                disabled={!selectedFile || isProcessing}
                className="bg-orange-600 hover:bg-orange-700 text-xs sm:text-sm flex-1"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white mr-2"></div>
                    Processando...
                  </>
                ) : (
                  <>
                    <Upload className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    Importar Dados
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={clearData}
                className="text-xs sm:text-sm"
              >
                Limpar Base
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Result */}
        {importResult && (
          <Card>
            <CardContent className="pt-6">
              <div
                className={`flex items-center gap-2 p-3 sm:p-4 rounded-lg ${
                  importResult.success
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
                }`}
              >
                {importResult.success ? (
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
                <p className="text-xs sm:text-sm font-medium">
                  {importResult.message}
                </p>
              </div>

              {importResult.success && (
                <div className="mt-4 text-center">
                  <Link href="/">
                    <Button className="bg-orange-600 hover:bg-orange-700 text-xs sm:text-sm">
                      <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      Voltar ao Sistema
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
