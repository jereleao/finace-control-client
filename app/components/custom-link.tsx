import { Link } from '@remix-run/react';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

interface CustomLinkProps extends React.LinkHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

const CustomLink = ({
  href,
  children,
  className,
  ...rest
}: CustomLinkProps) => {
  const isInternalLink = href.startsWith('/');
  const isAnchorLink = href.startsWith('#');

  if (isInternalLink || isAnchorLink) {
    return (
      <Link to={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <Link
      to={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex align-baseline gap-1 items-center underline underline-offset-4',
        className
      )}
      {...rest}
    >
      <span>{children}</span>
      <ExternalLinkIcon className="inline-block ml-0.5 w-4 h-4" />
    </Link>
  );
};

export default CustomLink;
