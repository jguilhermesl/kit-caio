'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Search,
  Package,
  CheckCircle,
  User,
  Building,
  Upload,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';
import Link from 'next/link';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Employee {
  id: string;
  nome: string;
  setor: string;
  status: 'pendente' | 'entregue';
  dataEntrega?: string;
  retiradoPor?: string;
  kits?: string;
  kitNatalino?: string;
}

export default function BRFKitSystem() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [substitutePickup, setSubstitutePickup] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Carregar dados do localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('brf-employees');
    if (savedData) {
      setEmployees(JSON.parse(savedData));
    } else {
      // Dados de exemplo apenas se não houver dados salvos
      const sampleData: Employee[] = [
        {
          id: '758971',
          nome: 'Caio Vinicius Galindo de Almeida',
          setor: 'Analista RH JR',
          status: 'pendente',
          kits: '1',
          kitNatalino: '1',
        },
      ];
      setEmployees(sampleData);
      localStorage.setItem('brf-employees', JSON.stringify(sampleData));
    }
  }, []);

  // Salvar dados no localStorage sempre que employees mudar
  useEffect(() => {
    if (employees.length > 0) {
      localStorage.setItem('brf-employees', JSON.stringify(employees));
    }
  }, [employees]);

  const handleDelivery = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDialogOpen(true);
  };

  const confirmDelivery = () => {
    if (selectedEmployee) {
      const now = new Date();
      const pad = (n: number) => n.toString().padStart(2, '0');
      const formattedDateTime = `${pad(now.getDate())}/${pad(
        now.getMonth() + 1
      )}/${now.getFullYear()} ${pad(now.getHours())}:${pad(
        now.getMinutes()
      )}:${pad(now.getSeconds())}`;
      const updatedEmployees = employees.map((emp) =>
        emp.id === selectedEmployee.id
          ? {
              ...emp,
              status: 'entregue' as const,
              dataEntrega: formattedDateTime,
              retiradoPor: substitutePickup || 'Próprio funcionário',
            }
          : emp
      );
      setEmployees(updatedEmployees);
      setIsDialogOpen(false);
      setSubstitutePickup('');
      setSelectedEmployee(null);
      toast({
        title: 'Kit entregue!',
        description: `Kit marcado como entregue para ${selectedEmployee.nome}.`,
      });
    }
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.includes(searchTerm) ||
      emp.setor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Função para exportar PDF
  const exportPDF = () => {
    // Criar PDF em modo paisagem para mais espaço
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    // Adicionar título
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Lista de Entrega de Kits Dezembro - ADM Recife', 14, 15);

    // Adicionar data de geração
    const now = new Date();
    const dataGeracao = `Gerado em: ${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR')}`;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(dataGeracao, 14, 22);

    // Cabeçalho da tabela
    const head = [
      [
        'ID',
        'Nome',
        'Setor',
        'Kits',
        'Natalino',
        'Status',
        'Data Entrega',
        'Retirado Por',
      ],
    ];

    // Dados da tabela (todos os funcionários filtrados)
    const data = filteredEmployees.map((emp) => [
      emp.id,
      emp.nome,
      emp.setor,
      emp.kits || '1',
      emp.kitNatalino || '0',
      emp.status === 'entregue' ? 'Entregue' : 'Pendente',
      emp.dataEntrega || '-',
      emp.retiradoPor || '-',
    ]);

    // Configurar tabela com autoTable
    autoTable(doc, {
      head,
      body: data,
      startY: 28,
      theme: 'striped',
      headStyles: {
        fillColor: [255, 102, 0], // Cor laranja da BRF
        textColor: [255, 255, 255],
        fontSize: 9,
        fontStyle: 'bold',
        halign: 'center',
      },
      bodyStyles: {
        fontSize: 8,
      },
      columnStyles: {
        0: { cellWidth: 20, halign: 'center' }, // ID
        1: { cellWidth: 55 }, // Nome
        2: { cellWidth: 45 }, // Setor
        3: { cellWidth: 15, halign: 'center' }, // Kits
        4: { cellWidth: 18, halign: 'center' }, // Natalino
        5: { cellWidth: 22, halign: 'center' }, // Status
        6: { cellWidth: 35, halign: 'center' }, // Data Entrega
        7: { cellWidth: 45 }, // Retirado Por
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { top: 28, left: 14, right: 14 },
    });

    // Adicionar rodapé com totais
    const finalY = (doc as any).lastAutoTable.finalY;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(
      `Total de Funcionários: ${filteredEmployees.length} | Pendentes: ${pendingEmployees.length} | Entregues: ${deliveredEmployees.length}`,
      14,
      finalY + 10
    );

    // Salvar o PDF
    doc.save(`lista-entrega-kits-${now.toLocaleDateString('pt-BR').replace(/\//g, '-')}.pdf`);

    // Mostrar notificação de sucesso
    toast({
      title: 'PDF exportado!',
      description: `${filteredEmployees.length} registros exportados com sucesso.`,
    });
  };

  const pendingEmployees = filteredEmployees.filter(
    (emp) => emp.status === 'pendente'
  );
  const deliveredEmployees = filteredEmployees.filter(
    (emp) => emp.status === 'entregue'
  );

  // Soma total de kits pendentes
  const totalPendingKits = pendingEmployees.reduce(
    (sum, emp) => sum + (parseInt(emp.kits || '1', 10) || 1),
    0
  );

  const EmployeeTable = ({
    employeeList,
    showActions = true,
    showKitsCount = false,
  }: {
    employeeList: Employee[];
    showActions?: boolean;
    showKitsCount?: boolean;
  }) => (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[60px]">ID</TableHead>
            <TableHead className="min-w-[120px]">Nome</TableHead>
            <TableHead className="min-w-[100px]">
              Setor
            </TableHead>
            <TableHead className="min-w-[60px]">
              Kits
            </TableHead>
            <TableHead className="min-w-[70px]">
              Kit Natalino
            </TableHead>
            <TableHead className="min-w-[80px]">Status</TableHead>
            {!showActions && (
              <TableHead className="min-w-[100px]">
                Data
              </TableHead>
            )}
            {!showActions && (
              <TableHead className="min-w-[120px]">
                Retirado Por
              </TableHead>
            )}
            {showActions && (
              <TableHead className="min-w-[100px]">Ações</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {employeeList.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="font-medium text-xs sm:text-sm">
                <div className="flex flex-col">
                  <span>{employee.id}</span>
                  {showKitsCount && (
                    <span className="text-[10px] text-gray-500 sm:hidden">
                      {parseInt(employee.kits || '1', 10)}{' '}
                      {parseInt(employee.kits || '1', 10) > 1
                        ? '(kits)'
                        : '(kit)'}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-xs sm:text-sm">
                <div className="font-medium">{employee.nome}</div>
              </TableCell>
              <TableCell className="text-xs sm:text-sm">
                <span className="truncate">{employee.setor}</span>
              </TableCell>
              <TableCell className="text-xs sm:text-sm text-center">
                <span>{employee.kits}</span>
              </TableCell>
              <TableCell className="text-xs sm:text-sm text-center">
                <span>{employee.kitNatalino}</span>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    employee.status === 'entregue' ? 'default' : 'secondary'
                  }
                  className="text-xs"
                >
                  {employee.status === 'entregue' ? (
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      <span className="hidden sm:inline">Entregue</span>
                      <span className="sm:hidden">OK</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <Package className="h-3 w-3" />
                      <span className="hidden sm:inline">Pendente</span>
                      <span className="sm:hidden">Pend</span>
                    </div>
                  )}
                </Badge>
              </TableCell>
              {!showActions && (
                <TableCell className="hidden md:table-cell text-xs">
                  {employee.dataEntrega}
                </TableCell>
              )}
              {!showActions && (
                <TableCell className="hidden lg:table-cell text-xs">
                  {employee.retiradoPor}
                </TableCell>
              )}
              {showActions && (
                <TableCell>
                  <Button
                    size="sm"
                    onClick={() => handleDelivery(employee)}
                    className="bg-orange-600 hover:bg-orange-700 text-xs px-2 py-1 sm:px-3 sm:py-2"
                  >
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Marcar</span>
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Mobile Optimized */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-4">
              <Image
                src="/brf-logo.png"
                alt="BRF Logo"
                width={40}
                height={40}
                className="object-contain sm:w-[60px] sm:h-[60px]"
              />
              <div>
                <h1 className="text-sm sm:text-xl font-bold text-gray-900">
                  Controle de Kits
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                  Gestão de entrega aos colaboradores
                </p>
              </div>
            </div>
            <Link href="/import">
              <Button
                size="sm"
                className="bg-orange-600 hover:bg-orange-700 text-xs sm:text-sm"
              >
                <Upload className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Importar</span>
                <span className="sm:hidden">Import</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Botão Exportar PDF */}
        <div className="flex justify-end mb-4">
          <Button
            onClick={exportPDF}
            className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm"
          >
            Exportar PDF
          </Button>
        </div>
        {/* Search - Mobile Optimized */}
        <div className="mb-4 sm:mb-8">
          <Card>
            <CardContent className="pt-4 sm:pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nome, ID ou setor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-sm"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats - Mobile Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-6 mb-4 sm:mb-8">
          <Card>
            <CardContent className="pt-3 sm:pt-6 p-3 sm:p-6">
              <div className="text-center sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">
                    Total
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">
                    {employees.length}
                  </p>
                </div>
                <User className="h-4 w-4 sm:h-8 sm:w-8 text-gray-400 mx-auto mt-1 sm:mx-0 sm:mt-0" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-3 sm:pt-6 p-3 sm:p-6">
              <div className="text-center sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">
                    Pendentes
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-orange-600">
                    {totalPendingKits}
                  </p>
                </div>
                <Package className="h-4 w-4 sm:h-8 sm:w-8 text-orange-400 mx-auto mt-1 sm:mx-0 sm:mt-0" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-3 sm:pt-6 p-3 sm:p-6">
              <div className="text-center sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">
                    Entregues
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-green-600">
                    {deliveredEmployees.length}
                  </p>
                </div>
                <CheckCircle className="h-4 w-4 sm:h-8 sm:w-8 text-green-400 mx-auto mt-1 sm:mx-0 sm:mt-0" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs - Mobile Optimized */}
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger
              value="pending"
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-3"
            >
              <Package className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">A Entregar</span>
              <span className="sm:hidden">Pendentes</span>
              <span className="ml-1">({totalPendingKits})</span>
            </TabsTrigger>
            <TabsTrigger
              value="delivered"
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-3"
            >
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Já Entregues</span>
              <span className="sm:hidden">Entregues</span>
              <span className="ml-1">({deliveredEmployees.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-sm sm:text-lg">
                  Kits Pendentes ({totalPendingKits})
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Colaboradores que ainda não retiraram
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 sm:p-6 sm:pt-0">
                {pendingEmployees.length > 0 ? (
                  <EmployeeTable
                    employeeList={pendingEmployees}
                    showKitsCount={true}
                  />
                ) : (
                  <div className="text-center py-8 text-gray-500 px-4">
                    <Package className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-sm sm:text-base">Nenhum kit pendente</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="delivered">
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-sm sm:text-lg">
                  Kits Entregues
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Colaboradores que já retiraram
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 sm:p-6 sm:pt-0">
                {deliveredEmployees.length > 0 ? (
                  <EmployeeTable
                    employeeList={deliveredEmployees}
                    showActions={false}
                  />
                ) : (
                  <div className="text-center py-8 text-gray-500 px-4">
                    <CheckCircle className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-sm sm:text-base">
                      Nenhum kit entregue ainda
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delivery Dialog - Mobile Optimized */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="mx-4 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm sm:text-base">
              Confirmar Entrega
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Confirme a entrega do kit para {selectedEmployee?.nome}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <p className="font-medium">ID:</p>
                <p>{selectedEmployee?.id}</p>
              </div>
              <div>
                <p className="font-medium">Setor:</p>
                <p>{selectedEmployee?.setor}</p>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-medium">
                Retirado por (opcional):
              </label>
              <Input
                placeholder="Ex: João Silva (supervisor)"
                value={substitutePickup}
                onChange={(e) => setSubstitutePickup(e.target.value)}
                className="text-sm"
              />
              <p className="text-xs text-gray-500">
                Deixe em branco se o próprio funcionário retirou
              </p>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="text-xs sm:text-sm"
            >
              Cancelar
            </Button>
            <Button
              onClick={confirmDelivery}
              className="bg-orange-600 hover:bg-orange-700 text-xs sm:text-sm"
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
