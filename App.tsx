
import React, { useState } from 'react';
import { Card } from './components/Card';
import { Modal } from './components/Modal';

interface Server {
  id: string;
  name: string;
  config: string;
}

interface CardData {
  id: string;
  category: string;
  title: string;
  description: string;
  servers: Server[];
  authorName: string;
  isComingSoon?: boolean;
}

const cardsData: CardData[] = [
  {
    id: 'sgdo',
    category: "AKUN ILMUPEDIA",
    title: "SERVER SINGAPORE ( SGDO )",
    description: "Akun VLESS & TROJAN TLS siap pakai. Klik untuk melihat detail dan menyalin konfigurasi.",
    servers: [
      {
        id: 'sgdo-vless',
        name: 'VLESS + TLS',
        config: 'vless://01f603f7-9b73-4fc2-bd00-c4786acb66ff@104.18.2.2:443?type=ws&encryption=none&security=tls&host=sgdo.lanexakuy.biz.id&path=/vless-tls&allowInsecure=1&sni=sgdo.lanexakuy.biz.id#XRAY_VLESS_TLS_userall',
      },
      {
        id: 'sgdo-trojan',
        name: 'TROJAN + TLS',
        config: 'trojan://a7d7965a-f69a-42a3-adff-382f65a348a1@104.18.2.2:443?type=ws&security=tls&host=sgdo.lanexakuy.biz.id&path=/trojan-tls&sni=sgdo.lanexakuy.biz.id#XRAY_TROJAN_TLS_userall',
      }
    ],
    authorName: "Lanexa",
    isComingSoon: false,
  },
  {
    id: 'aws',
    category: "AKUN ILMUPEDIA",
    title: "SERVER SINGAPORE ( AWS )",
    description: "Akun VLESS & TROJAN TLS siap pakai. Klik untuk melihat detail dan menyalin konfigurasi.",
    servers: [
      {
        id: 'aws-vless',
        name: 'VLESS + TLS',
        config: 'vless://74f74221-6b82-4044-bdfa-f12ab4162d87@104.18.2.2:443?type=ws&encryption=none&security=tls&host=aws.lanexa.my.id&path=/vless-tls&allowInsecure=1&sni=aws.lanexa.my.id#XRAY_VLESS_TLS_alluser',
      },
      {
        id: 'aws-trojan',
        name: 'TROJAN + TLS',
        config: 'trojan://18d53306-43ae-4ecf-a79a-6e39b07d0be0@104.18.2.2:443?type=ws&security=tls&host=aws.lanexa.my.id&path=/trojan-tls&sni=aws.lanexa.my.id#alluser',
      }
    ],
    authorName: "Lanexa",
    isComingSoon: false,
  },
  {
    id: 'telkomsel-opok',
    category: "INTERNET GRATIS",
    title: "OPOK 0 KUOTA ( TELKOMSEL )",
    description: "Server ini akan segera tersedia. Nantikan pembaruan selanjutnya!",
    servers: [],
    authorName: "Lanexa",
    isComingSoon: true,
  }
];

const App: React.FC = () => {
  const [modalData, setModalData] = useState<CardData | null>(null);

  return (
    <main className="min-h-screen w-full bg-blue-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="flex flex-wrap gap-8 justify-center">
        {cardsData.map((card) => (
          <Card
            key={card.id}
            category={card.category}
            title={card.title}
            description={card.description}
            authorName={card.authorName}
            isComingSoon={card.isComingSoon}
            onClick={() => {
              if (!card.isComingSoon) {
                setModalData(card);
              }
            }}
          />
        ))}
      </div>
      {modalData && (
        <Modal
          category={modalData.category}
          title={modalData.title}
          servers={modalData.servers}
          authorName={modalData.authorName}
          onClose={() => setModalData(null)}
        />
      )}
    </main>
  );
};

export default App;