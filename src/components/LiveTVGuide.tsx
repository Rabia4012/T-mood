import { useState } from "react";
import { motion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";

const tvGuideData = [
  {
    kanal: "TV 2",
    program: "Skal vi danse - Finale",
    tid: "19:00 - 20:00",
  },
  {
    kanal: "TV 2 Play",
    program: "Nyhetene - Direkte",
    tid: "19:00- 21:00",
  },
  {
    kanal: "TV3",
    program: "Eliteserien - Fotball",
    tid: "18:00 - 20:00",
  },
  {
    kanal: "TV 2",
    program: "God morgen Norge",
    tid: "06:00 - 10:00",
  },
  {
    kanal: "TV3",
    program: "Luksusfellen",
    tid: "21:00 - 22:00",
  },
  {
    kanal: "TV 2 Play",
    program: "Norske talenter",
    tid: "20:00 - 21:30",
  },
  { kanal: "TV 2", program: "Krafttak", tid: "22:00 - 23:00" },
  {
    kanal: "TV3",
    program: "Paradise Hotel",
    tid: "22:00 - 23:00",
  },
  {
    kanal: "TV 2 Play",
    program: "Farmen",
    tid: "21:30 - 23:00",
  },
  {
    kanal: "TV 2",
    program: "Dagsrevyen",
    tid: "22:00 - 00:00",
  },
];

interface LiveTVGuideProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function LiveTVGuide({ isOpen: externalIsOpen, onOpenChange }: LiveTVGuideProps = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = onOpenChange || setInternalIsOpen;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
      >
        <span className="text-sm text-foreground">Live TV</span>
        <div className="relative">
          <motion.div
            className="w-3 h-3 rounded-full bg-destructive"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <motion.div
            className="absolute inset-0 w-3 h-3 rounded-full bg-destructive"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 0, 0.7],
            }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="relative">
                <motion.div
                  className="w-3 h-3 rounded-full bg-destructive"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                  }}
                />
              </div>
              <span>Live TV - Direkte sending nå</span>
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">
                    Kanal
                  </TableHead>
                  <TableHead className="font-bold">
                    Program
                  </TableHead>
                  <TableHead className="font-bold">
                    Tid
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tvGuideData.map((item, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-muted/50"
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-primary text-white border-0">
                          {item.kanal}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="bg-destructive/10 text-destructive border-destructive/20"
                        >
                          LIVE
                        </Badge>
                        <span className="text-foreground">
                          {item.program}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {item.tid}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}