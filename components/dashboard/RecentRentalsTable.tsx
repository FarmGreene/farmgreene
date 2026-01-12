import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const recentRentals = [
  {
    id: "R-1024",
    equipment: "John Deere 5050D",
    renter: {
      name: "Tunde Bakare",
      image: "",
      initials: "TB",
    },
    date: "Oct 24, 2025",
    duration: "3 Days",
    amount: "₦150,000",
    status: "Active",
  },
  {
    id: "R-1023",
    equipment: "Cassava Peeler Pro",
    renter: {
      name: "Sade Adu",
      image: "",
      initials: "SA",
    },
    date: "Oct 20, 2025",
    duration: "1 Day",
    amount: "₦15,000",
    status: "Completed",
  },
  {
    id: "R-1022",
    equipment: "Irrigation Pump X2",
    renter: {
      name: "Wale Oke",
      image: "",
      initials: "WO",
    },
    date: "Oct 18, 2025",
    duration: "5 Days",
    amount: "₦25,000",
    status: "Completed",
  },
  {
    id: "R-1021",
    equipment: "John Deere 5050D",
    renter: {
      name: "Emeka Obi",
      image: "",
      initials: "EO",
    },
    date: "Oct 15, 2025",
    duration: "2 Days",
    amount: "₦100,000",
    status: "Cancelled",
  },
];

export function RecentRentalsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Equipment</TableHead>
          <TableHead>Renter</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentRentals.map((rental) => (
          <TableRow key={rental.id}>
            <TableCell className="font-medium">{rental.id}</TableCell>
            <TableCell>{rental.equipment}</TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={rental.renter.image} />
                  <AvatarFallback>{rental.renter.initials}</AvatarFallback>
                </Avatar>
                <span>{rental.renter.name}</span>
              </div>
            </TableCell>
            <TableCell>{rental.date}</TableCell>
            <TableCell>{rental.amount}</TableCell>
            <TableCell className="text-right">
              <Badge
                variant={
                  rental.status === "Active"
                    ? "default"
                    : rental.status === "Completed"
                    ? "secondary"
                    : "destructive"
                }
              >
                {rental.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
