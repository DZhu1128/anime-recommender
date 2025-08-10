import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimeCard({ anime }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-xs cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <Card className="overflow-hidden shadow-lg rounded-2xl">
        <CardContent className="p-0">
          <img
            src={anime.image}
            alt={anime.title}
            className="w-full h-60 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold mb-1">{anime.title}</h3>
            <p className="text-sm text-gray-600">{anime.genre}</p>

            <AnimatePresence>
              {expanded && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 text-sm text-gray-700"
                >
                  {anime.description}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
