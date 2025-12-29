import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RiskBadge } from "@/components/RiskBadge";
import { Shield, AlertTriangle } from "lucide-react";

// Mock data for LE console
const mockTransactions = [
  { id: "1", accountId: "ACC-2024-0891", riskScore: 85, amount: 15000, type: "Wire Transfer", source: "Unknown", destination: "Offshore Account", riskLevel: "high" as const, timestamp: "2024-01-15 14:32:00" },
  { id: "2", accountId: "ACC-2024-1234", riskScore: 45, amount: 2500, type: "Card Payment", source: "Local Bank", destination: "E-commerce", riskLevel: "medium" as const, timestamp: "2024-01-15 12:15:00" },
  { id: "3", accountId: "ACC-2024-0456", riskScore: 15, amount: 150, type: "ATM Withdrawal", source: "Local ATM", destination: "Cash", riskLevel: "low" as const, timestamp: "2024-01-15 10:45:00" },
  { id: "4", accountId: "ACC-2024-0789", riskScore: 92, amount: 50000, type: "Crypto Exchange", source: "Unknown Wallet", destination: "Exchange", riskLevel: "high" as const, timestamp: "2024-01-15 09:20:00" },
  { id: "5", accountId: "ACC-2024-0123", riskScore: 30, amount: 800, type: "Online Transfer", source: "Savings", destination: "Checking", riskLevel: "low" as const, timestamp: "2024-01-14 16:00:00" },
];

export default function LawEnforcementConsole() {
  const [accountFilter, setAccountFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [timeFilter, setTimeFilter] = useState<string>("all");

  const filteredTransactions = mockTransactions.filter((tx) => {
    if (accountFilter && !tx.accountId.toLowerCase().includes(accountFilter.toLowerCase())) {
      return false;
    }
    if (riskFilter !== "all" && tx.riskLevel !== riskFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container py-4">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" strokeWidth={1.5} />
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Law Enforcement Console
              </h1>
              <p className="text-xs text-muted-foreground">CyberShield</p>
            </div>
          </div>
        </div>
      </header>

      {/* Disclaimer */}
      <div className="bg-muted border-b border-border">
        <div className="container py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertTriangle className="h-4 w-4" />
            <span className="font-medium">
              Authorized Access Only – Law Enforcement Use
            </span>
          </div>
        </div>
      </div>

      <main className="container py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Transaction Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="account-filter">Account ID</Label>
                <Input
                  id="account-filter"
                  placeholder="Search by Account ID..."
                  value={accountFilter}
                  onChange={(e) => setAccountFilter(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Risk Score</Label>
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="All Risk Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk Levels</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="low">Low Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Time Window</Label>
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="All Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="24h">Last 24 Hours</SelectItem>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Transaction Risk Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account ID</TableHead>
                    <TableHead>Risk Score</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="font-mono text-sm">{tx.accountId}</TableCell>
                      <TableCell>
                        <span className={tx.riskScore >= 70 ? "risk-high" : tx.riskScore >= 40 ? "risk-medium" : "risk-low"}>
                          {tx.riskScore}
                        </span>
                      </TableCell>
                      <TableCell>${tx.amount.toLocaleString()}</TableCell>
                      <TableCell>{tx.type}</TableCell>
                      <TableCell>{tx.source}</TableCell>
                      <TableCell>{tx.destination}</TableCell>
                      <TableCell><RiskBadge level={tx.riskLevel} /></TableCell>
                      <TableCell className="text-muted-foreground text-sm">{tx.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
