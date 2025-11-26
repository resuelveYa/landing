import { LucideIcon, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ProductCardProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  features: Feature[];
  url: string;
  gradient: string;
  buttonGradient: string;
  buttonText: string;
}

export default function ProductCard({
  title,
  subtitle,
  icon: Icon,
  features,
  url,
  gradient,
  buttonGradient,
  buttonText,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-200 transform hover:scale-[1.02] transition-transform duration-300">
      {/* Header */}
      <div className={`${gradient} p-8 text-white`}>
        <div className="flex items-center gap-4 mb-4">
          <Icon size={40} />
          <div>
            <h3 className="text-3xl font-black">{title}</h3>
            <p className="text-white/90 text-lg">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-8">
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => {
            const FeatureIcon = feature.icon;
            return (
              <div
                key={index}
                className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <FeatureIcon size={32} className="mx-auto text-gray-700 mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full ${buttonGradient} text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105`}
        >
          <Icon size={24} />
          {buttonText}
          <ExternalLink size={20} />
        </Link>
      </div>
    </div>
  );
}